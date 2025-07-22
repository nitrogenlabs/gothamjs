export default {
  entryJs: 'app.tsx',
  esbuild: {
    minify: process.env.NODE_ENV === 'production'
  },
  gitUrl: 'https://github.com/nitrogenlabs/gothamjs',
  jest: {
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: {
      '^@nlabs/utils$': '<rootDir>/node_modules/@nlabs/utils',
      '^@nlabs/utils/strings/cn$': '<rootDir>/node_modules/@nlabs/utils/lib/strings/cn/cn.js',
      '^@nlabs/utils/objects/merge$': '<rootDir>/node_modules/@nlabs/utils/lib/objects/merge/merge.js',
      '^@nlabs/utils/objects/get$': '<rootDir>/node_modules/@nlabs/utils/lib/objects/get/get.js',
      '^@nlabs/utils/objects/set$': '<rootDir>/node_modules/@nlabs/utils/lib/objects/set/set.js',
      '^@nlabs/utils/objects/throttle$': '<rootDir>/node_modules/@nlabs/utils/lib/objects/throttle/throttle.js',
      '^@nlabs/utils/checks/isEmpty$': '<rootDir>/node_modules/@nlabs/utils/lib/checks/isEmpty/isEmpty.js',
      '^@nlabs/utils/strings/qs$': '<rootDir>/node_modules/@nlabs/utils/lib/strings/qs/qs.js',
      '^react$': '<rootDir>/node_modules/react',
      '^react-dom$': '<rootDir>/node_modules/react-dom',
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
