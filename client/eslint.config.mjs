import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { includeIgnoreFile } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier",
    "plugin:tailwindcss/recommended",
  ),
  ...compat.plugins("@typescript-eslint", "import"),
  includeIgnoreFile(gitignorePath),
  {
    ignores: ["*/tailwind.config.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "tailwindcss/no-custom-classname": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
