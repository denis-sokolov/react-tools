import type { Dependency } from "./types";

import { getLicenseName } from "./lcwp";

import findup from "findup-sync";

function getPackageJson(directory: string) {
  const path = `${directory}/package.json`;

  let contents: unknown;
  try {
    contents = require(path);
  } catch (err) {
    throw new Error(`Could not open ${path}`);
  }

  if (typeof contents !== "object" || !contents)
    throw new Error(`Invalid format of ${path}`);

  return contents as { [k: string]: unknown };
}

function getUrl(name: string, pkg: { [k: string]: unknown }) {
  const home = pkg.homepage;
  if (typeof home === "string" && home) return home;

  const repo = pkg.repository;
  if (typeof repo === "string") {
    const m = repo.match(/^git@github.com:(.+).git$/);
    if (m) return `https://github.com/${m[1]}`;
  }

  return `https://www.npmjs.com/package/${name}`;
}

export function getDependencies(directory: string): Dependency[] {
  const client = getPackageJson(directory);
  const names = Object.keys(
    typeof client.devDependencies === "object"
      ? client.devDependencies || {}
      : {},
  ).concat(
    Object.keys(
      typeof client.dependencies === "object" ? client.dependencies || {} : {},
    ),
  );

  return names.map(function (name) {
    const depPkgPath = findup("node_modules/" + name + "/package.json", {
      cwd: directory,
    });
    if (!depPkgPath)
      throw new Error(
        `Could not find ${name} dependency installed for ${directory}. Try to run npm install in ${directory}.`,
      );
    const depDir = depPkgPath.replace(/\/package\.json$/, "");
    const depPkg = getPackageJson(depDir);

    return {
      author: typeof depPkg.author === "string" ? depPkg.author : undefined,
      directory: depDir,
      name,
      licenseName: getLicenseName(depPkg),
      url: getUrl(name, depPkg),
      version: typeof depPkg.version === "string" ? depPkg.version : undefined,
    };
  });
}
