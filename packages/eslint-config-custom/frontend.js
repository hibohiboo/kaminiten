module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "@kaminiten/eslint-config-custom/defaults",
    "plugin:react-hooks/recommended",
    "turbo",
    "prettier",
  ],
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
