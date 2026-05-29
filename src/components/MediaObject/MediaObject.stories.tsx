import {FileText} from 'lucide-react';
import React from 'react';

import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {MediaObject} from './MediaObject.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof MediaObject> = {
  component: MediaObject,
  parameters: {
    layout: 'padded'
  },
  title: 'Application UI/Layout/MediaObject'
};

export default meta;

type Story = StoryObj<typeof MediaObject>;

export const Default: Story = {
  args: {
    description: 'A flexible media object for list rows, feeds, and compact summaries.',
    media: <div className="flex size-12 items-center justify-center rounded-md bg-muted text-primary"><FileText className="size-6" /></div>,
    title: 'Project brief'
  },
  play: interactWithCanvas
};
