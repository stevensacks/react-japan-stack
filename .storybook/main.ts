import type {StorybookConfig} from '@storybook/react-vite';
import {mergeConfig} from 'vite';
import turbosnap from 'vite-plugin-turbosnap';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        grid: false,
        measure: false,
        outline: false,
      },
    },
    '@storybook/addon-interactions',
    'storybook-react-i18next',
    'storybook-dark-mode',
    '@chromatic-com/storybook',
  ],

  docs: {},

  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: '.storybook/vite.config.ts',
      },
    },
  },

  stories: ['../app/**/*.stories.tsx'],

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  viteFinal: async (viteConfig, {configType}) =>
    mergeConfig(viteConfig, {
      define: {
        'import.meta.env.GOOGLE_MAPS_API_KEY': JSON.stringify(
          process.env.GOOGLE_MAPS_API_KEY
        ),
        'import.meta.env.GOOGLE_MAPS_MAP_ID': JSON.stringify(
          process.env.GOOGLE_MAPS_MAP_ID
        ),
      },
      plugins: [
        tsconfigPaths(),
        ...(configType === 'PRODUCTION' ?
          [turbosnap({rootDir: viteConfig.root ?? process.cwd()})]
        : []),
      ],
    }),
};

export default config;
