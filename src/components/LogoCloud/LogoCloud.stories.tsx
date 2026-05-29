import {LogoCloud} from './LogoCloud.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const logos = ['Transistor', 'Reform', 'Tuple', 'SavvyCal', 'Statamic'].map((name) => ({
  alt: name,
  src: `https://tailwindcss.com/plus-assets/img/logos/158x48/${name.toLowerCase()}-logo-gray-900.svg`,
  width: 158
}));

const meta: Meta<typeof LogoCloud> = {
  component: LogoCloud,
  parameters: {
    layout: 'fullscreen'
  },
  title: 'Marketing/Sections/LogoCloud'
};

export default meta;

type Story = StoryObj<typeof LogoCloud>;

export const Default: Story = {
  args: {
    logos,
    title: 'Trusted by the world’s most innovative teams'
  }
};
