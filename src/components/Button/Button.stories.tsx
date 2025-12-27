import React from 'react';
import {I18nextProvider, initReactI18next} from 'react-i18next';
import {i18n} from '../../i18n/index.js';
import {gothamColors} from '../../utils/colorUtils.js';
import {Button as ButtonComponent} from './Button.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof ButtonComponent> = {
  argTypes: {
    color: {
      control: 'select',
      options: gothamColors
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text']
    }
  },
  component: ButtonComponent,
  decorators: [
    (Story) => {
      // Initialize i18n for Storybook
      const storyI18n = i18n.createInstance();
      storyI18n
        .use(initReactI18next)
        .init({
          resources: {
            en: {
              translation: {
                'Button': 'Button'
              }
            }
          },
          lng: 'en',
          fallbackLng: 'en',
          interpolation: {
            escapeValue: false,
          },
        });

      return (
        <I18nextProvider i18n={storyI18n}>
          <div className="p-4">
            <Story />
          </div>
        </I18nextProvider>
      );
    }
  ],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {name: 'light', value: '#ffffff'},
        {name: 'dark', value: '#1a1a1a'}
      ]
    },
    layout: 'centered'
  },
  title: 'Components/Button'
};

export default meta;

type Story = StoryObj<typeof ButtonComponent>;

export const Button: Story = {
  args: {
    color: 'secondary',
    disabled: false,
    hasShadow: false,
    isLoading: false,
    label: 'Button',
    size: 'md',
    variant: 'contained'
  }
};
