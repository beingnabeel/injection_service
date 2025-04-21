import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'logs/**', 'prisma/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
  prettierConfig, // Use only the eslint-config-prettier, not the prettier module itself
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error', // Marks prettier issues as ESlint errors
    },
  },
]);
