import {ReviewList} from './ReviewList.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof ReviewList> = {
  component: ReviewList,
  parameters: {
    layout: 'padded'
  },
  title: 'Ecommerce/ReviewList'
};

export default meta;

type Story = StoryObj<typeof ReviewList>;

export const MultiColumn: Story = {
  args: {
    reviews: [
      {author: 'Judith Black', body: 'The quality is excellent and the packaging feels considered.', rating: 5, title: 'Worth it'},
      {author: 'Leslie Alexander', body: 'Beautiful details, quick shipping, and easy checkout.', rating: 4, title: 'Great experience'}
    ]
  }
};
