# Notify Component

The Notify component provides a customizable notification system for displaying alerts, messages, and interactive notifications to users.

## Features

- **Multiple Severity Levels**: Support for error, warning, info, and success notifications
- **Customizable Positioning**: Position notifications at any corner or edge of the screen
- **Auto-dismiss**: Automatically hide notifications after a configurable duration
- **Interactive Actions**: Add buttons or icon buttons for user interaction
- **Tailwind CSS Styling**: Fully styled with Tailwind CSS for easy customization

## Usage

```tsx
import {GothamActions} from '@actions/GothamActions';

// Basic notification
GothamActions.notify({
  message: 'This is a basic notification',
  autoHideDuration: 5000
});

// Notification with severity
GothamActions.notify({
  message: 'Operation completed successfully',
  severity: 'success'
});

// Notification with custom position
GothamActions.notify({
  message: 'This appears in the top right',
  anchorOrigin: {
    horizontal: 'right',
    vertical: 'top'
  }
});

// Notification with actions
GothamActions.notify({
  message: 'Would you like to undo?',
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
  ]
});
```

## Props

The `GothamNotifyParams` interface accepts the following properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `message` | ReactElement \| string | - | The content of the notification |
| `severity` | 'error' \| 'warning' \| 'info' \| 'success' | - | The severity level of the notification |
| `autoHideDuration` | number | 3000 | Time in milliseconds before automatically dismissing |
| `anchorOrigin` | { horizontal: 'left' \| 'center' \| 'right', vertical: 'top' \| 'bottom' } | { horizontal: 'left', vertical: 'bottom' } | Position of the notification |
| `actions` | GothamNotifyAction[] | [] | Array of action buttons to display |

### GothamNotifyAction

| Property | Type | Description |
|----------|------|-------------|
| `icon` | string | Icon name to display (uses the Svg component) |
| `label` | string | Text label for the button |
| `onClick` | (key: string) => void | Callback function when the action is clicked |

## Implementation Details

The Notify component uses:

- **Headless UI's Transition** for smooth enter/exit animations
- **Custom Button and IconButton components** built with Tailwind CSS
- **Custom Alert component** with appropriate styling for each severity level
- **ArkhamJS Flux architecture** for state management and event handling

## Tailwind CSS Classes

The component uses the following Tailwind CSS utility classes:

- Positioning: `fixed`, `top-4`, `bottom-4`, `left-4`, `right-4`, etc.
- Layout: `flex`, `items-center`, `justify-between`, etc.
- Spacing: `p-4`, `m-4`, `space-x-2`, etc.
- Visual: `shadow-lg`, `rounded-lg`, `bg-white`, etc.
- Colors: `bg-red-500`, `bg-blue-500`, `bg-green-500`, `bg-yellow-500`, etc.
- Transitions: `transform`, `transition`, `duration-300`, etc.

## Customization

To customize the appearance of the notifications, you can modify the Tailwind CSS classes in the component or extend the Tailwind configuration to include your project's design tokens.