module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ["plugin:@theorem/opinionated"],
  ignorePatterns: ["dist"],
  plugins: ["@theorem"],
};
