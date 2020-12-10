export default {
  environmentVariables: {
    TS_NODE_PROJECT: "tsconfig.ava.json",
  },
  extensions: ["ts", "tsx"],
  files: ["{bin,src}/**/*.test.{js,jsx,ts,tsx}"],
  require: ["ts-node/register/transpile-only"],
};
