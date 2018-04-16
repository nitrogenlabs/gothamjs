import * as path from 'path';

const appPackage = require('../package.json');

const configBase = {
  absolute: (...args) => [path.resolve(__dirname, '../'), ...args].join('/'),
  allowedOrigins: {
    development: [
      'localhost'
    ],
    production: [
      'arkhamjs.com'
    ]
  },
  directories: {
    development: 'dist/dev',
    dist: 'dist',
    preprod: 'dist/preprod',
    production: 'dist/prod',
    src: 'src',
    test: 'test'
  },
  env: process.env.NODE_ENV || 'development',
  external: {
    css: [
      '/css/core.css'
    ],
    js: []
  },
  filenames: {
    entry: 'app.tsx',
    icons: 'icons.svg',
    index: 'index.html',
    scss: 'core.scss'
  },
  name: 'arkhamjs-skeleton',
  port: {
    development: 5000,
    production: 3000
  },
  relative: (...args) => ['.', ...args].join('/'),
  title: 'ArkhamJS Skeleton',
  url: 'arkhamjs.com',
  version: appPackage.version
};

const configModules = {
  karma: {
    configFile: configBase.absolute('karma.conf.js')
  }
};

const configPath = {
  dist: {
    css: configBase.relative(configBase.directories.dist, 'css/'),
    fonts: configBase.relative(configBase.directories.dist, 'fonts/'),
    icons: configBase.relative(configBase.directories.dist, 'icons/'),
    img: configBase.relative(configBase.directories.dist, 'img/')
  },
  docs: './docs',
  outputPath: configBase.absolute(configBase.directories.dist, 'js'),
  src: {
    entry: configBase.absolute(configBase.directories.src, configBase.filenames.entry),
    fonts: {
      dir: configBase.relative(configBase.directories.src, 'fonts/'),
      files: []
    },
    html: configBase.relative(configBase.directories.src, '**/*.html'),
    icons: {
      files: [
        configBase.relative(configBase.directories.src, 'icons/*.svg')
      ]
    },
    img: {
      files: [
        configBase.relative(configBase.directories.src, 'img/**/*.{png,jpg,gif,svg}'),
        configBase.relative(configBase.directories.src, 'views/**/*.{png,jpg,gif,svg}'),
        configBase.relative(configBase.directories.src, 'favicon.ico')
      ]
    },
    ts: configBase.relative(configBase.directories.src, '**/*.ts')
  },
  test: {
    e2e: configBase.relative(configBase.directories.test, 'e2e/**/*.js'),
    unit: configBase.relative(configBase.directories.test, 'unit/index.js')
  },
  tmp: 'tmp'
};

export const appConfig = {...configBase, ...configModules, path: configPath};
