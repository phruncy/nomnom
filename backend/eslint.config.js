import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
    {
        files: ['**/*.js', '**/*.mjs'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            // ESLint Recommended rules
            'no-unused-vars': 'warn',
            'no-console': 'warn',

            // Prettier integration
            'prettier/prettier': 'error',
        },
    },
];
