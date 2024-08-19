// Hack
// https://github.com/microsoft/license-checker-webpack-plugin/issues/30
// eslint-disable-next-line @denis-sokolov/no-imports-down
import { getLicenseViolations } from "license-checker-webpack-plugin/src/licenseUtils.js";

// eslint-disable-next-line @denis-sokolov/no-imports-down
export { getLicenseName } from "license-checker-webpack-plugin/src/licenseUtils.js";

import { type Dependency } from "../types";

export function getDependenciesWithLicenseViolations(
  allowedLicenses: string,
  dependencies: Dependency[],
): Dependency[] {
  return dependencies.filter((d) => {
    const errors = getLicenseViolations(
      {
        [d.name]: { version: "", ...d },
      },
      allowedLicenses,
    );
    return errors.length > 0;
  });
}
