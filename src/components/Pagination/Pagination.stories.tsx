import {useState} from 'react';

import {Pagination as PaginationComponent} from './Pagination.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';
import type {ComponentProps} from 'react';

const PaginationStory = (args: ComponentProps<typeof PaginationComponent>) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);

  return (
    <div className="w-full max-w-4xl bg-white p-6 dark:bg-black-dark">
      <PaginationComponent
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const meta: Meta<typeof PaginationComponent> = {
  argTypes: {
    currentPage: {
      control: 'number'
    },
    pageSize: {
      control: 'number'
    },
    siblingCount: {
      control: 'number'
    },
    totalItems: {
      control: 'number'
    },
    totalPages: {
      control: 'number'
    },
    variant: {
      control: 'select',
      options: ['centered', 'simple']
    }
  },
  component: PaginationComponent,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Pagination'
};

export default meta;

type Story = StoryObj<typeof PaginationComponent>;

export const Centered: Story = {
  args: {
    currentPage: 2,
    totalPages: 10,
    variant: 'centered'
  },
  render: PaginationStory
};

export const Simple: Story = {
  args: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 97,
    totalPages: 10,
    variant: 'simple'
  },
  render: PaginationStory
};
