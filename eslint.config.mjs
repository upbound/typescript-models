import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import vitest from "eslint-plugin-vitest";
import nodePlugin from "eslint-plugin-n";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  globalIgnores(["**/dist/", "coverage/", "**/node_modules/", "**/gen/"]),
  {
    extends: compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:n/recommended",
      "plugin:prettier/recommended"
    ),

    plugins: {
      "@typescript-eslint": typescriptEslint,
      vitest,
      n: nodePlugin
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: "script"
    },

    settings: {
      n: {
        tryExtensions: [".ts", ".js", ".cjs", ".mjs", ".json", ".node"]
      }
    },

    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-parameter-properties": "off",

      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true
        }
      ],

      "n/no-unsupported-features/es-syntax": [
        "error",
        {
          ignores: ["modules"]
        }
      ],

      // Allow importing from ajv/dist paths (these are valid imports)
      "n/no-missing-import": "off",

      // Allow Node.js builtins that are widely available
      "n/no-unsupported-features/node-builtins": "off",

      // Allow process.exit in CLI tools
      "n/no-process-exit": "off",

      // Allow unpublished bins (they're published via files field)
      "n/no-unpublished-bin": "off",

      "no-restricted-imports": [
        "error",
        {
          name: "lodash",
          message:
            "Do not use lodash because it doesn't support ES modules. Please use es-toolkit instead."
        },
        {
          name: "lodash-es",
          message: "Please use es-toolkit instead."
        }
      ]
    }
  },
  {
    files: ["**/*.{js,cjs}", "**/bin/**/*.js"],

    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      // Bin files require dist files that are created during build
      "n/no-missing-require": "off"
    }
  },
  {
    files: ["examples/**/*.ts"],

    rules: {
      "n/no-missing-import": "off"
    }
  },
  {
    files: ["**/__tests__/**/*.{js,mjs,ts}"],

    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "n/no-unpublished-import": "off"
    }
  },
  {
    files: [
      "**/*.config.{js,mjs,ts}",
      ".vitest/**/*.ts",
      "scripts/**/*.ts",
      "eslint.config.mjs"
    ],

    rules: {
      "n/no-unpublished-import": "off"
    }
  }
]);
