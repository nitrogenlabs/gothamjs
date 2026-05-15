import React, {useEffect, useState} from 'react';
import {interactWithCanvas} from '../../utils/storyInteractions.js';
import {Button} from '../Button/Button.js';
import {Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle} from './Dialog.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';
import type {ComponentProps} from 'react';

const DialogStory = (args: Omit<ComponentProps<typeof Dialog>, 'onClose' | 'open'> & {open?: boolean}) => {
  const [open, setOpen] = useState(args.open ?? true);

  useEffect(() => {
    setOpen(args.open ?? true);
  }, [args.open]);

  return (
    <>
      <Button label="Open dialog" onClick={() => setOpen(true)} />
      <Dialog {...args} onClose={setOpen} open={open}>
        <DialogTitle>Archive project</DialogTitle>
        <DialogDescription>Archived projects can be restored from workspace settings.</DialogDescription>
        <DialogBody>Use this dialog to confirm a destructive workflow without leaving the current task.</DialogBody>
        <DialogActions>
          <Button label="Cancel" onClick={() => setOpen(false)} variant="outlined" />
          <Button color="error" label="Archive" onClick={() => setOpen(false)} />
        </DialogActions>
      </Dialog>
    </>
  );
};

const meta: Meta<typeof Dialog> = {
  argTypes: {
    open: {
      control: 'boolean'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']
    }
  },
  component: Dialog,
  parameters: {
    layout: 'centered'
  },
  title: 'Components/Dialog'
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    open: true,
    size: 'lg'
  } as never,
  play: interactWithCanvas,
  render: DialogStory as never
};
