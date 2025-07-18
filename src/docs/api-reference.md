# GothamJS API Reference

This document provides detailed information about the components and APIs available in GothamJS.

## Core Components

### `<Gotham>`

The main component that bootstraps your GothamJS application.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `GothamConfiguration` | `{}` | Configuration object for the application |
| `children` | `ReactNode` | - | Optional child components |
| `classes` | `Record<string, string>` | - | Custom CSS classes |
| `isAuth` | `() => boolean` | - | Authentication check function |

**Example:**

```jsx
import { Gotham } from '@nlabs/gothamjs';

const config = {
  app: {
    name: 'my-app',
    title: 'My Application'
  },
  routes: [
    // Your routes
  ]
};

const App = () => (
  <Gotham config={config} />
);
```

### `<GothamProvider>`

Provider component that sets up the GothamJS context.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `GothamConfiguration` | Required | Configuration object for the application |
| `children` | `ReactNode` | - | Child components |
| `session` | `Record<string, unknown>` | `{}` | Initial session data |

## Form Components

### `<Form>`

Form component with built-in validation using Zod.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Form fields and controls |
| `className` | `string` | - | Custom CSS class |
| `defaultValues` | `Record<string, unknown>` | `{}` | Default form values |
| `mode` | `'onSubmit'` \| `'onBlur'` \| `'onChange'` \| `'onTouched'` \| `'all'` | `'onBlur'` | Form validation mode |
| `name` | `string` | `'default'` | Form name (used for test IDs) |
| `onChange` | `(data: unknown) => void` | - | Change handler |
| `onSubmit` | `(data: unknown, event: BaseSyntheticEvent, setError: (field: string, error: { type: string; message: string }) => void) => void` | Required | Submit handler |
| `schema` | `z.ZodSchema<Record<string, unknown>>` | - | Zod validation schema |
| `validate` | `(data: unknown) => void` | - | Custom validation function |
| `validateOnBlur` | `boolean` | - | Whether to validate on blur |

**Example:**

```jsx
import { Form, TextField, Button } from '@nlabs/gothamjs';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const LoginForm = () => (
  <Form
    schema={schema}
    onSubmit={(data) => console.log(data)}
    defaultValues={{ email: '', password: '' }}
  >
    <TextField name="email" label="Email" />
    <TextField name="password" type="password" label="Password" />
    <Button type="submit" label="Submit" />
  </Form>
);
```

### `<TextField>`

Text input component.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Custom CSS class |
| `disabled` | `boolean` | `false` | Whether the field is disabled |
| `error` | `string` | - | Error message |
| `id` | `string` | - | Field ID |
| `label` | `string` | - | Field label |
| `name` | `string` | Required | Field name |
| `onChange` | `(event: ChangeEvent<HTMLInputElement>) => void` | - | Change handler |
| `placeholder` | `string` | - | Placeholder text |
| `required` | `boolean` | `false` | Whether the field is required |
| `type` | `'text'` \| `'password'` \| `'email'` \| `'number'` \| `'tel'` | `'text'` | Input type |
| `value` | `string` | - | Field value |

### `<SelectField>`

Dropdown select component.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Custom CSS class |
| `disabled` | `boolean` | `false` | Whether the field is disabled |
| `error` | `string` | - | Error message |
| `id` | `string` | - | Field ID |
| `label` | `string` | - | Field label |
| `name` | `string` | Required | Field name |
| `onChange` | `(event: ChangeEvent<HTMLSelectElement>) => void` | - | Change handler |
| `options` | `Array<{ label: string; value: string }>` | `[]` | Select options |
| `placeholder` | `string` | - | Placeholder text |
| `required` | `boolean` | `false` | Whether the field is required |
| `value` | `string` | - | Field value |

### `<RadioField>`

Radio button group component.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Custom CSS class |
| `disabled` | `boolean` | `false` | Whether the field is disabled |
| `error` | `string` | - | Error message |
| `id` | `string` | - | Field ID |
| `label` | `string` | - | Field label |
| `name` | `string` | Required | Field name |
| `onChange` | `(event: ChangeEvent<HTMLInputElement>) => void` | - | Change handler |
| `options` | `Array<{ label: string; value: string }>` | `[]` | Radio options |
| `required` | `boolean` | `false` | Whether the field is required |
| `value` | `string` | - | Field value |

### `<DateField>`

Date picker component.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Custom CSS class |
| `disabled` | `boolean` | `false` | Whether the field is disabled |
| `error` | `string` | - | Error message |
| `id` | `string` | - | Field ID |
| `label` | `string` | - | Field label |
| `name` | `string` | Required | Field name |
| `onChange` | `(date: Date) => void` | - | Change handler |
| `placeholder` | `string` | - | Placeholder text |
| `required` | `boolean` | `false` | Whether the field is required |
| `value` | `Date` | - | Field value |

## UI Components

### `<Button>`

Button component with multiple variants and states.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Button content |
| `className` | `string` | - | Custom CSS class |
| `color` | `GothamColor` | `'primary'` | Button color |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `hasNotification` | `boolean` | `false` | Show notification indicator |
| `hasShadow` | `boolean` | `false` | Show shadow effect |
| `icon` | `ReactNode` | - | Button icon |
| `isLoading` | `boolean` | `false` | Show loading spinner |
| `label` | `string` | `''` | Button label (used if children not provided) |
| `onClick` | `(event?: unknown) => void` | `() => {}` | Click handler |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` | Button size |
| `tabIndex` | `number` | - | Tab index |
| `type` | `'button'` \| `'reset'` \| `'submit'` | `'button'` | Button type |
| `variant` | `'text'` \| `'contained'` \| `'outlined'` | - | Button variant |

### `<Loader>`

Loading indicator component.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Custom CSS class |
| `color` | `string` | `'primary'` | Loader color |
| `content` | `string` | - | Loading message |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` | Loader size |

### `<Notify>`

Notification component for displaying alerts and messages.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `Array<{ label: string; onClick: () => void }>` | `[]` | Action buttons |
| `anchorOrigin` | `{ horizontal: 'left' \| 'center' \| 'right', vertical: 'top' \| 'bottom' }` | `{ horizontal: 'center', vertical: 'bottom' }` | Position of the notification |
| `autoHideDuration` | `number` | `5000` | Auto-hide duration in milliseconds |
| `className` | `string` | - | Custom CSS class |
| `isOpen` | `boolean` | `false` | Whether the notification is open |
| `message` | `string` | Required | Notification message |
| `onClose` | `() => void` | - | Close handler |
| `severity` | `'success'` \| `'info'` \| `'warning'` \| `'error'` | `'info'` | Notification severity |

### `<Svg>`

SVG icon component.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Custom CSS class |
| `color` | `string` | - | Icon color |
| `height` | `number` | - | Icon height |
| `name` | `string` | Required | Icon name |
| `width` | `number` | - | Icon width |

## Navigation Components

### `<GothamRoute>`

Route component for defining routes with authentication.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `authenticate` | `boolean` | `false` | Whether the route requires authentication |
| `element` | `ReactElement` | Required | Component to render |
| `path` | `string` | Required | Route path |

### `<AuthRoute>`

Route component that handles authentication redirects.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `authenticate` | `boolean` | `false` | Whether the route requires authentication |
| `element` | `ReactElement` | Required | Component to render |
| `path` | `string` | Required | Route path |

## Configuration Types

### `GothamConfiguration`

Configuration object for GothamJS applications.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `app` | `{ logo?: string; name?: string; title?: string; titleBarSeparator?: string; }` | `{ name: 'gotham', title: 'GothamJS' }` | Application metadata |
| `baseUrl` | `string` | `''` | Base URL for the application |
| `config` | `FluxOptions` | - | Flux configuration options |
| `displayMode` | `'light'` \| `'dark'` | - | Theme display mode |
| `flux` | `FluxFramework` | - | Custom Flux instance |
| `isAuth` | `() => boolean` | `() => false` | Authentication check function |
| `middleware` | `FluxMiddlewareType[]` | `[]` | Flux middleware |
| `onInit` | `() => void` | - | Initialization callback |
| `routes` | `GothamRouteData[]` | `[]` | Application routes |
| `storageType` | `'local'` \| `'session'` | `'session'` | Storage type for persisted state |
| `stores` | `unknown[]` | `[]` | Additional Flux stores |
| `theme` | `Record<string, unknown>` | `{}` | Theme configuration |
| `translations` | `Record<string, unknown>` | `{ translation: {} }` | i18n translations |

## Actions

### `GothamActions`

Action creators for common operations.

| Method | Parameters | Description |
|--------|------------|-------------|
| `init` | `() => Promise<FluxAction>` | Initialize the application |
| `loading` | `(isLoading: boolean, content?: string) => Promise<FluxAction>` | Show/hide loading indicator |
| `navBack` | `() => Promise<FluxAction>` | Navigate back |
| `navForward` | `() => Promise<FluxAction>` | Navigate forward |
| `navGoto` | `(path: string, params?: Record<string, unknown>) => Promise<FluxAction>` | Navigate to a path |
| `navReplace` | `(path: string, params?: Record<string, unknown>) => Promise<FluxAction>` | Replace current route |
| `notify` | `(params: GothamNotifyParams) => Promise<FluxAction>` | Show notification |
| `notifyClose` | `() => Promise<FluxAction>` | Close notification |
| `setConfig` | `(config: GothamConfiguration) => Promise<FluxAction>` | Update configuration |
| `signOut` | `() => Promise<FluxAction>` | Sign out user |
| `updateTitle` | `(title: string, separator?: string) => Promise<FluxAction>` | Update page title |