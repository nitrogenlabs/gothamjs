import {FaqSection} from './FaqSection.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof FaqSection> = {
  component: FaqSection,
  parameters: {
    layout: 'fullscreen'
  },
  title: 'Marketing/Sections/FaqSection'
};

export default meta;

type Story = StoryObj<typeof FaqSection>;

export const ThreeColumn: Story = {
  args: {
    description: 'Answers for the most common implementation questions.',
    faqs: [
      {answer: 'Yes. Components accept data props and className overrides.', question: 'Can I reuse these across microsites?'},
      {answer: 'Yes. Classes target Tailwind v4 tokens and Gotham theme colors.', question: 'Are the styles Gotham-aware?'},
      {answer: 'Yes. Each component has a sibling test and Storybook example.', question: 'Are examples included?'}
    ],
    title: 'Frequently asked questions'
  }
};
