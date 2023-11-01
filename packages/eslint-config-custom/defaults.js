module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  rules: {
    // semi: ["error", "never", { beforeStatementContinuationChars: "never" }],
    semi: ["error", "always"],
  },
};
