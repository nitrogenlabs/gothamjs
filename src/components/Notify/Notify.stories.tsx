import {useEffect} from 'react';

import {GothamActions} from '../../actions/GothamActions.js';
import {Notify} from './Notify.js';
import {NotifyExample} from './NotifyExample.js';

import type {Meta, StoryObj} from '@nlabs/lex/storybook';

const meta: Meta<typeof Notify> = {
  component: Notify,
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Notify />
      </div>
    )
  ],
  parameters: {
    layout: 'fullscreen'
  },
  title: 'Components/Notify'
};

export default meta;
type Story = StoryObj<typeof Notify>;

export const Basic: Story = {
  render: () => {
    useEffect(() => {
      // Show notification when the story loads
      GothamActions.notify({
        autoHideDuration: 5000,
        message: 'This is a basic notification'
      });

      return () => {
        // Clean up when the story changes
        GothamActions.notifyClose();
      };
    }, []);

    return <></>;
  }
};

export const Success: Story = {
  render: () => {
    useEffect(() => {
      GothamActions.notify({
        message: 'Operation completed successfully',
        severity: 'success'
      });

      return () => {
        GothamActions.notifyClose();
      };
    }, []);

    return <></>;
  }
};

export const Error: Story = {
  render: () => {
    useEffect(() => {
      GothamActions.notify({
        message: 'An error occurred',
        severity: 'error'
      });

      return () => {
        GothamActions.notifyClose();
      };
    }, []);

    return <></>;
  }
};

export const Warning: Story = {
  render: () => {
    useEffect(() => {
      GothamActions.notify({
        message: 'This is a warning message',
        severity: 'warning'
      });

      return () => {
        GothamActions.notifyClose();
      };
    }, []);

    return <></>;
  }
};

export const Info: Story = {
  render: () => {
    useEffect(() => {
      GothamActions.notify({
        message: 'This is an informational message',
        severity: 'info'
      });

      return () => {
        GothamActions.notifyClose();
      };
    }, []);

    return <></>;
  }
};

export const TopRight: Story = {
  render: () => {
    useEffect(() => {
      GothamActions.notify({
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        message: 'This appears in the top right'
      });

      return () => {
        GothamActions.notifyClose();
      };
    }, []);

    return <></>;
  }
};

export const WithActions: Story = {
  render: () => {
    useEffect(() => {
      GothamActions.notify({
        actions: [
          {
            label: 'Undo',
            onClick: (key) => {
              console.log('Undo clicked', key);
              // Perform undo action
            }
          },
          {
            icon: 'close',
            onClick: (key) => {
              console.log('Close clicked', key);
              GothamActions.notifyClose();
            }
          }
        ],
        message: 'Would you like to undo?'
      });

      return () => {
        GothamActions.notifyClose();
      };
    }, []);

    return <></>;
  }
};

export const Examples: Story = {
  render: () => <NotifyExample />
};
