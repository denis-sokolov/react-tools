#!/usr/bin/env node

import { Command } from "commander";

import pkg from "../../package.json";

const program = new Command()
  .arguments("<directory> [..otherDirectories]")
  .option(
    "--licenses <spdx-expression>",
    "SPDX expression with allowed licenses.",
    "(Apache-2.0 OR BSD-2-Clause OR BSD-3-Clause OR MIT OR ISC OR CC0-1.0 OR 0BSD OR Unlicense)",
  )
  .option(
    "--override <map>",
    "Override license detection for some dependencies. Use the following syntax: react:MIT,custom-lib-to-ignore,typescript:Apache-2.0",
  )
  .option(
    "--skip <dependencies>",
    "Skip some dependencies entirely. Use comma-separated list of package names.",
  )
  .version(pkg.version)
  .parse(process.argv);

const directories = program.args;
if (directories.length < 1) {
  program.help();
  process.exit(2);
}

const opts = program.opts();
const licenses: string = opts.licenses;
const override = ((opts.override as string) || "")
  .split(",")
  .filter((s) => s)
  .map(function (s) {
    const [name, license] = s.split(":");
    if (!license)
      throw new Error(
        "Can not parse --override parameter. It must be a comma-separated list of name:license pairs",
      );
    return { license, name };
  });
const skip = ((opts.skip as string) || "").split(",").filter((s) => s);

import { resolve } from "path";

import { getDependencies } from "./getDependencies";
import { getDependenciesWithLicenseViolations } from "./lcwp";

async function main() {
  const dependencies = directories
    .map((d) => resolve(d))
    .flatMap(getDependencies)
    .filter((d) => !skip.includes(d.name))
    .map(function (d) {
      const overriden = override.find((o) => o.name === d.name);
      return overriden ? { ...d, licenseName: overriden.license } : d;
    });

  const violating = getDependenciesWithLicenseViolations(
    licenses,
    dependencies,
  );

  const uniq = function <Item>(l: Item[]): Item[] {
    return Array.from(new Set(l));
  };

  const uniqBy = function <Item>(
    l: Item[],
    by: (item: Item) => string,
  ): Item[] {
    const obj: { [k: string]: Item } = {};
    l.forEach((item) => (obj[by(item)] = item));
    return Object.values(obj);
  };

  if (violating.length) {
    console.error("Some packages violate the allowed licenses:");
    const violatingLicenses = uniq(violating.map((d) => d.licenseName));
    violatingLicenses.forEach(function (license) {
      console.error(
        " -",
        license,
        "used by",
        uniq(
          violating.filter((d) => d.licenseName === license).map((d) => d.name),
        ).join(", "),
      );
    });
    process.exit(1);
  }

  console.log("Third party packages and their licenses");
  console.log("For full license contents see https://spdx.org/licenses/");
  console.log("");
  uniqBy(dependencies, (d) => d.name)
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach(function (dep) {
      console.log(
        dep.version ? `${dep.name}@${dep.version}` : dep.name,
        "licensed under",
        dep.licenseName,
      );
      console.log(" ", dep.author ? `${dep.author}, ${dep.url}` : dep.url);
    });
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
