import {Button} from '@mui/material';

import { Notify, type GothamSeverity } from './Notify';
import {GothamActions} from '../../actions/GothamActions';
import {gothamDecorator} from '../../utils/storyUtils';

import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof Notify> = {
  component: Notify
};

export default meta;
type Story = StoryObj<typeof Notify>;

const notifyButton = (message: string, severity: GothamSeverity) => (Story) => {
  return (
    <>
      <Button onClick={() => GothamActions.notifyOpen(message, {variant: severity})}>{`Open ${message}`}</Button>
      <Story />
    </>
  );
};

export const Info: Story = {
  decorators: [
    gothamDecorator,
    notifyButton('Info', 'info')
  ]
};

export const Error: Story = {
  decorators: [
    gothamDecorator,
    notifyButton('Error', 'error')
  ]
};

export const Success: Story = {
  decorators: [
    gothamDecorator,
    notifyButton('Success', 'success')
  ]
};

export const Warning: Story = {
  decorators: [
    gothamDecorator,
    notifyButton('Warning', 'warning')
  ]
};
