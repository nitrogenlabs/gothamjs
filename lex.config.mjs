export default {
  entryJs: 'app.tsx',
  gitUrl: 'https://github.com/nitrogenlabs/gothamjs',
  jest: {
    moduleNameMapper: {
      '^@nlabs/utils$': '<rootDir>/node_modules/@nlabs/utils',
      '^react$': '<rootDir>/node_modules/react',
      '^react-dom$': '<rootDir>/node_modules/react-dom',
      '^react-markdown$': '<rootDir>/node_modules/@nlabs/lex/emptyModule.js',
      '\\.(css|jpg|png|svg|txt)$': '<rootDir>/node_modules/@nlabs/lex/emptyModule.js'
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transformIgnorePatterns: [
      'node_modules/(?!(strip-indent|chalk|@testing-library/jest-dom|zod|@nlabs|@nlabs/arkhamjs|@nlabs/utils|@nlabs/lex|react-markdown|react|react-dom|develop)/.*)'
    ]
  },
  outputPath: './lib',
  useTypescript: true
};
