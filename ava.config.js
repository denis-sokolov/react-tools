export default {
  extensions: {
    ts: "module",
    tsx: "module",
  },
  files: ["{bin,src}/**/*.test.{js,jsx,ts,tsx}"],
  nodeArguments: [
    "--experimental-specifier-resolution=node",
    "--loader=ts-node/esm",
    "--no-warnings",
  ],
};
