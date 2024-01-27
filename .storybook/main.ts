import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  babel: async (options) => ({
    ...options,
    babelrc: false
  }),
  webpackFinal: async (config) => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module?.rules || [],
        {
          test: /\.(ts|tsx)$/,
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            presets: [
              '@babel/preset-typescript',
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
            ],
            plugins: [
              ['@babel/plugin-proposal-nullish-coalescing-operator'],
              ['@babel/plugin-proposal-optional-chaining'],
            ],
          },
        }
      ]
    },
    resolve: {
      ...config.resolve,
      extensions: ['.js', '.ts', '.tsx']
    },
    stats: 'verbose'
  }),
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
