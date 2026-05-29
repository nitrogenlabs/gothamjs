import {ProductGrid} from './ProductGrid.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const products = [
  {
    href: '#',
    id: 1,
    imageAlt: 'Tall porcelain bottle with cork stopper.',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg',
    name: 'Earthen Bottle',
    price: '$48'
  },
  {
    href: '#',
    id: 2,
    imageAlt: 'Olive insulated bottle with flared lid.',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
    name: 'Nomad Tumbler',
    price: '$35'
  },
  {
    href: '#',
    id: 3,
    imageAlt: 'Paper refill cards on a desk.',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
    name: 'Focus Paper Refill',
    price: '$89'
  },
  {
    href: '#',
    id: 4,
    imageAlt: 'Black machined mechanical pencil.',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg',
    name: 'Machined Mechanical Pencil',
    price: '$35'
  }
];

const meta: Meta<typeof ProductGrid> = {
  component: ProductGrid,
  parameters: {
    layout: 'padded'
  },
  title: 'Ecommerce/ProductGrid'
};

export default meta;

type Story = StoryObj<typeof ProductGrid>;

export const Simple: Story = {
  args: {
    products
  }
};
