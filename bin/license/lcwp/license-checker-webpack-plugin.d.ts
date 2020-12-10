declare module "license-checker-webpack-plugin/src/licenseUtils.js" {
  export function getLicenseName(name: object): string;
  export function getLicenseViolations(
    licenseInformation: {
      [name: string]: { licenseName: string; version: string };
    },
    allow: string
  ): Error[];
}
