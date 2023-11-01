module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "plugin:react-hooks/recommended",
    "@kaminiten/eslint-config-custom/defaults",
  ],
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
