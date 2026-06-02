import React from 'react';
import {I18nextProvider, initReactI18next} from 'react-i18next';

import {i18n} from '../../i18n/index.js';
import {gothamColors} from '../../utils/colorUtils.js';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Button as ButtonComponent} from './Button.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof ButtonComponent> = {
  argTypes: {
    color: {
      control: 'select',
      options: gothamColors
    },
    backgroundColor: {
      control: 'select',
      options: [...gothamColors, 'transparent']
    },
    hasShadow: {
      control: 'boolean'
    },
    isLoading: {
      control: 'boolean'
    },
    labelColor: {
      control: 'select',
      options: gothamColors
    },
    rounded: {
      control: {
        max: 32,
        min: 0,
        step: 1,
        type: 'number'
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'text', 'contained', 'outlined']
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
          fallbackLng: 'en',
          interpolation: {
            escapeValue: false
          },
          lng: 'en',
          resources: {
            en: {
              translation: {
                Button: 'Button'
              }
            }
          }
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
    rounded: 0,
    size: 'md',
    variant: 'solid'
  },
  play: interactWithCanvas
};
