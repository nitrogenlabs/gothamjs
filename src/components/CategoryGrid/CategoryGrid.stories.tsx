import {CategoryGrid} from './CategoryGrid.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof CategoryGrid> = {
  component: CategoryGrid,
  parameters: {
    layout: 'padded'
  },
  title: 'Ecommerce/CategoryGrid'
};

export default meta;

type Story = StoryObj<typeof CategoryGrid>;

export const ImageBackgrounds: Story = {
  args: {
    categories: [
      {
        href: '#',
        imageAlt: 'Desk accessories arranged on a tabletop.',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-01.jpg',
        name: 'Desk and office'
      },
      {
        href: '#',
        imageAlt: 'Organized productivity products.',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-02.jpg',
        name: 'Self-improvement'
      },
      {
        href: '#',
        imageAlt: 'Travel products in warm light.',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-03.jpg',
        name: 'Travel'
      }
    ]
  }
};
