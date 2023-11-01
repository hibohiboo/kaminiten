module.exports = {
  env: { es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-turbo",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  rules: {
    // semi: ["error", "never", { beforeStatementContinuationChars: "never" }],
    semi: ["error", "always"],
  },
};
