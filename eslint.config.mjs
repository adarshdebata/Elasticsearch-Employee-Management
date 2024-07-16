import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  {
    ignores: [
      "node_modules/",
      "config/",
      "swagger-doc.json",
      ".env",
      "package-lock.json",
    ],
  },
];
