import lexConfig from '@nlabs/lex/eslint.config.mjs';

export default [
  ...lexConfig,
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      'import/no-extraneous-dependencies': 'off'
    }
  }
];
