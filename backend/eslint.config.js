import js from '@eslint/js';
export default [
  js.configs.recommended,
  { files: ['src/**/*.js','tests/**/*.js'], languageOptions: { ecmaVersion:'latest', sourceType:'module', globals:{process:'readonly',Buffer:'readonly',setTimeout:'readonly',clearTimeout:'readonly'} }, rules: { 'no-console':'off', 'no-unused-vars':['error',{argsIgnorePattern:'^_'}] } }
];
