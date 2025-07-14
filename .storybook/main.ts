import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-styling',
    '@storybook/addon-themes'
  ],
  babel: async (options) => ({
    ...options,
    babelrc: false
  }),
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true
      }
    }
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  webpackFinal: async (config) => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module?.rules || [],
        {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            plugins: [
              ['@babel/plugin-proposal-nullish-coalescing-operator'],
              ['@babel/plugin-proposal-optional-chaining']
            ],
            presets: [
              '@babel/preset-typescript',
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic'
                }
              ]
            ]
          },
          test: /\.(ts|tsx)$/
        }
        // {
        //   test: /\.css$/,
        //   use: [
        //     require.resolve('style-loader'),
        //     require.resolve('css-loader'),
        //     {
        //       loader: require.resolve('postcss-loader'),
        //       options: {
        //         postcssOptions: {
        //           plugins: [
        //             require('@tailwindcss/postcss')
        //             // require('autoprefixer')
        //           ]
        //         }
        //       }
        //     }
        //   ]
        // }
      ]
    },
    resolve: {
      ...config.resolve,
      extensions: ['.js', '.ts', '.tsx'],
      plugins: [
        ...(config.resolve?.plugins || [])
      ]
    },
    stats: 'verbose'
  })
};

export default config;
