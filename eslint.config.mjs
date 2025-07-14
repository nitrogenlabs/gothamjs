import importPlugin from 'eslint-plugin-import';
import * as tseslint from 'typescript-eslint';

export default tseslint.config([
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'comma-dangle': ['error', 'never'],
      'import/default': 'off',
      'import/export': 'error',
      'import/exports-last': 'off',
      'import/extensions': 'off',
      'import/first': 'error',
      'import/named': 'off',
      'import/newline-after-import': 'error',
      'import/no-absolute-path': 'error',
      'import/no-cycle': 'error',
      'import/no-deprecated': 'warn',
      'import/no-duplicates': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          'devDependencies': [
            '**/__tests__/*',
            '**/__tests__/**/*',
            '**/tests/*',
            '**/tests/**/*',
            '**/*.test.js*',
            '**/*.spec.js*',
            '**/*.test.ts*',
            '**/*.spec.ts*',
            'jest.setup.js',
            '**/*.config.*',
            '**/utils/testUtils.tsx',
            '**/jest.setup.ts',
            '**/jest.setup.ts',
            '**/lex.config.js',
            'eslint.config.mjs',
            '.storybook/*',
          ],
          'peerDependencies': true
        }
      ],
      'import/no-internal-modules': 'off',
      'import/no-mutable-exports': 'error',
      'import/no-named-as-default': 'error',
      'import/no-named-as-default-member': 'warn',
      'import/no-self-import': 'error',
      'import/no-unresolved': 'off',
      'import/no-useless-path-segments': 'error',
      'import/no-webpack-loader-syntax': 'off',
      'import/order': [
        'error',
        {
          'alphabetize': {
            'caseInsensitive': true,
            'order': 'asc'
          },
          'groups': [
            ['builtin', 'external', 'internal'],
            ['parent', 'sibling', 'index'],
            'type'
          ],
          'newlines-between': 'always'
        }
      ],
      'import/prefer-default-export': 'off',
      'indent': ['error', 2, {
        'SwitchCase': 1
      }],
      'no-console': 'warn',
      'no-trailing-spaces': 'error',
      'no-unused-vars': 'warn',
      'prefer-const': 'error',
      'quotes': ['error', 'single'],
      'semi': 'error',
      'sort-imports': 'off',
      'sort-keys': ['error', 'asc', {
        'caseSensitive': true,
        'minKeys': 2,
        'natural': false
      }]
    },
    ignores: [
      '**/node_modules/**',
      '**/lib/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.storybook/**'
    ]
  },
  tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        'argsIgnorePattern': '^_',
        'ignoreRestSiblings': true,
        'varsIgnorePattern': '^_'
      }],
      'no-unused-vars': 'off'
    }
  }
]);