export default {
  entryJs: 'app.tsx',
  gitUrl: 'https://github.com/nitrogenlabs/gothamjs',
  jest: {
    globals: {
      "ts-jest": {
        useESM: true,
        isolatedModules: true,
      },
    },
    extensionsToTreatAsEsm: ['.ts'],
    moduleDirectories: ["js", ".", "node_modules"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testEnvironment: 'jsdom',
    transform: {
      '\\.[jt]sx?$': 'ts-jest',
    },
    transformIgnorePatterns: [
      // 'node_modules/(?!(strip-indent|chalk)/)',
      "node_modules/(?!(strip-indent|chalk)/.*)",
    ],
    // moduleNameMapper: {
    //   '^strip-indent$': '<rootDir>/node_modules/strip-indent/index.js',
    //   '^chalk$': '<rootDir>/node_modules/chalk/index.js'
    // }
  },
  outputPath: './lib',
  useTypescript: true
};
