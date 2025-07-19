# GothamJS: The Complete Front-End UI Framework
## Seamlessly integrating components, routing, state management, and transitions

> A comprehensive front-end UI framework that handles everything from component rendering to routing and smooth transitions with minimal configuration.

[![npm version](https://img.shields.io/npm/v/gothamjs.svg?style=flat-square)](https://www.npmjs.com/package/gothamjs)
[![npm downloads](https://img.shields.io/npm/dm/gothamjs.svg?style=flat-square)](https://www.npmjs.com/package/gothamjs)
[![Issues](http://img.shields.io/github/issues/nitrogenlabs/gothamjs.svg?style=flat-square)](https://github.com/nitrogenlabs/gothamjs/issues)
[![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Chat](https://img.shields.io/discord/446122412715802649.svg)](https://discord.gg/Ttgev58)

GothamJS is an all-inclusive React framework that unifies UI components, navigation, state management, and transitions into one cohesive system. Built by Nitrogen Labs, GothamJS eliminates the need to piece together multiple libraries, providing developers with a consistent, integrated solution for all front-end UI needs.

## ✨ Key Features

- **Unified Component Library**: Beautifully designed, fully customizable UI components with consistent styling and behavior
- **Seamless Routing & Transitions**: Built-in navigation system with smooth page transitions and animations
- **Integrated State Management**: Flux-based state handling that connects directly to your UI components
- **Form System**: Complete form components with validation, error handling, and accessibility features
- **Theming & Styling**: Light/dark mode support and customizable design system based on Tailwind CSS
- **Responsive Design**: Mobile-first components that adapt beautifully to any screen size
- **Internationalization**: Built-in i18n support for multilingual applications
- **Authentication Flows**: Ready-to-use authentication UI components and routing guards

## 🚀 Getting Started

```bash
# Install GothamJS
npm install @nlabs/gothamjs

# Or with yarn
yarn add @nlabs/gothamjs
```

Create your first GothamJS application:

```jsx
import { createRoot } from 'react-dom/client';
import { Gotham } from '@nlabs/gothamjs';

// Define your application configuration
const config = {
  app: {
    name: 'my-awesome-app',
    title: 'My Awesome App'
  },
  routes: [
    {
      path: '/',
      element: <HomePage />,
      props: {
        topBar: {
          logo: <img src="/logo.png" alt="Logo" />,
          menu: [
            { label: 'Sign In', url: '/signin' },
            { label: 'Sign Up', url: '/signup' }
          ]
        }
      }
    }
  ]
};

// Render your application
const root = createRoot(document.getElementById('app'));
root.render(<Gotham config={config} />);
```

## 🧩 Components

GothamJS provides a rich set of components to accelerate your development:

### Form Components

```jsx
import { Form, TextField, Button } from '@nlabs/gothamjs';
import { z } from 'zod';

// Define your form schema with Zod
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

const LoginForm = () => (
  <Form
    schema={loginSchema}
    onSubmit={(data) => console.log('Form submitted:', data)}
  >
    <TextField
      name="email"
      label="Email"
      placeholder="Enter your email"
    />
    <TextField
      name="password"
      type="password"
      label="Password"
      placeholder="Enter your password"
    />
    <Button
      type="submit"
      variant="contained"
      color="primary"
      label="Sign In"
    />
  </Form>
);
```

### UI Components

```jsx
import { Button, Notify, Loader } from '@nlabs/gothamjs';

// Stylish button with multiple variants
<Button
  variant="contained" // 'contained', 'outlined', or 'text'
  color="primary"     // 'primary', 'secondary', 'success', 'error', etc.
  size="md"           // 'sm', 'md', or 'lg'
  onClick={handleClick}
>
  Click Me
</Button>

// Show notifications
<Notify
  message="Operation completed successfully!"
  severity="success" // 'success', 'info', 'warning', or 'error'
  autoHideDuration={5000}
/>

// Loading indicator
<Loader size="md" />
```

## 📊 State Management

GothamJS uses ArkhamJS, a Flux implementation, for state management:

```jsx
import { useFlux } from '@nlabs/arkhamjs-utils-react';
import { GothamActions } from '@nlabs/gothamjs';

const MyComponent = () => {
  const flux = useFlux();

  // Navigate to a new route
  const handleNavigation = () => {
    GothamActions.navGoto('/dashboard');
  };

  // Show a notification
  const showNotification = () => {
    GothamActions.notify({
      message: 'This is a notification',
      severity: 'info'
    });
  };

  // Show/hide loading indicator
  const startLoading = () => {
    GothamActions.loading(true, 'Loading data...');

    // After operation completes
    setTimeout(() => {
      GothamActions.loading(false);
    }, 2000);
  };

  return (
    <div>
      <Button onClick={handleNavigation} label="Go to Dashboard" />
      <Button onClick={showNotification} label="Show Notification" />
      <Button onClick={startLoading} label="Start Loading" />
    </div>
  );
};
```

## 🌐 Routing

GothamJS simplifies routing with React Router integration:

```jsx
const config = {
  routes: [
    {
      path: '/',
      element: <HomeView />,
      props: {
        // Props passed to the component
      }
    },
    {
      path: '/dashboard',
      element: <DashboardView />,
      authenticate: true, // Requires authentication
      children: [
        {
          path: 'profile',
          element: <ProfileView />
        },
        {
          path: 'settings',
          element: <SettingsView />
        }
      ]
    }
  ]
};
```

## 🔒 Authentication

GothamJS provides built-in authentication support:

```jsx
const config = {
  // Define authentication check function
  isAuth: () => Boolean(localStorage.getItem('token')),
  routes: [
    {
      path: '/protected',
      element: <ProtectedView />,
      authenticate: true // This route requires authentication
    }
  ]
};
```

## 🌍 Internationalization

Easy internationalization with i18next:

```jsx
const config = {
  translations: {
    en: {
      greeting: 'Hello, {{name}}!',
      buttons: {
        submit: 'Submit'
      }
    },
    es: {
      greeting: '¡Hola, {{name}}!',
      buttons: {
        submit: 'Enviar'
      }
    }
  }
};

// In your component
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('greeting', { name: 'User' })}</h1>
      <Button label={t('buttons.submit')} />
    </div>
  );
};
```

## 🎨 Theming

GothamJS supports light/dark mode and custom themes:

```jsx
const config = {
  displayMode: 'dark', // 'light' or 'dark'
  theme: {
    // Custom theme properties
    colors: {
      primary: '#3f51b5',
      secondary: '#f50057'
    }
  }
};
```

## 🔧 Configuration

GothamJS is highly configurable:

```jsx
const config = {
  app: {
    name: 'my-app',
    title: 'My Application',
    logo: '/logo.svg',
    titleBarSeparator: '|'
  },
  baseUrl: '',
  storageType: 'local', // 'local' or 'session'
  middleware: [customMiddleware],
  stores: [customStore],
  onInit: () => {
    // Custom initialization logic
    console.log('App initialized');
  }
};
```

## 💼 Why Choose GothamJS?

- **UI Consistency**: Create visually cohesive applications with a unified design language
- **Developer Experience**: Spend less time wiring up libraries and more time building features
- **Reduced Bundle Size**: One framework instead of multiple libraries means optimized bundle size
- **Seamless Transitions**: Built-in animations and transitions between routes and UI states
- **Accessibility**: Components designed with accessibility in mind from the start
- **Rapid Development**: Go from concept to production with significantly less boilerplate code
- **TypeScript Support**: Full type definitions for enhanced developer experience

## 📚 Learn More

Visit our [official documentation](http://gothamjs.io) for comprehensive guides, API references, and examples.

## 📦 Related Packages

- [@nlabs/arkhamjs](https://github.com/nitrogenlabs/arkhamjs) - Flux implementation
- [@nlabs/lex](https://github.com/nitrogenlabs/lex) - Build and development tools

## 📄 License

GothamJS is [MIT licensed](./LICENSE).
