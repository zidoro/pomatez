module.exports = {
  extends: ["react-app", "react-app/jest", "prettier", "turbo"],
  plugins: ["prettier", "unused-imports"],
  rules: {
    "prettier/prettier": ["error", { usePrettierrc: true }],
    "unused-imports/no-unused-imports": "error",
    "react/display-name": 0,
    "import/no-duplicates": 1,
    "react/no-children-prop": 0,
    "react/no-unescaped-entities": 0,
    "import/no-useless-path-segments": 1,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
  },
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      rules: {
        "prettier/prettier": ["warn", { usePrettierrc: true }],
      },
    },
  ],
};
