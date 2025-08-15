import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import expectType from "eslint-plugin-expect-type/configs/recommended";

export const getBaseConfig = (dirname) => {
    const compat = new FlatCompat({
        baseDirectory: dirname,
        recommendedConfig: js.configs.recommended,
        allConfig: js.configs.all
    });
    return [
        expectType,
        ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),
        {
            ignores: ["*", "!src/**"],
        },
        {
            files: ['**/*.ts', '**/*.tsx'],
            languageOptions: {
                globals: {
                    ...globals.browser,
                    ...globals.node,
                },

                parser: tsParser,
                ecmaVersion: "latest",
                sourceType: "module",

                parserOptions: {
                    project: ["./tsconfig.json"],
                    tsconfigRootDir: dirname,
                },
            },

            rules: {
            },
        },
        {
            "files": ['**/*.test-d.ts'],
            rules: {
                "@typescript-eslint/no-unused-vars": "off",
                "@typescript-eslint/no-unused-expressions": "off"
            },
        },
        {
            "files": ["tests/**/*"],
            "env": {
                "jest": true
            }
        }
    ];
}

