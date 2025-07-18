# GothamJS

> A powerful React framework for building modern, scalable web applications with minimal configuration.

GothamJS is a comprehensive React framework that combines the best of modern web development tools and practices into a cohesive, easy-to-use platform. Built by Nitrogen Labs, GothamJS empowers developers to create robust applications with less code and greater consistency.

## ✨ Key Features

- **Complete Application Framework**: Everything you need to build production-ready React applications
- **Flux Architecture**: Built-in state management based on ArkhamJS (Flux implementation)
- **Routing System**: Seamless integration with React Router
- **Form Management**: Powerful form handling with validation via React Hook Form and Zod
- **UI Component Library**: Beautiful, customizable components with Tailwind CSS
- **Internationalization**: Built-in i18n support
- **Authentication**: Ready-to-use authentication flows
- **Notifications**: Elegant notification system
- **Theming**: Light/dark mode support and customizable themes

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

- **Productivity**: Build faster with pre-built components and patterns
- **Consistency**: Enforce best practices across your application
- **Flexibility**: Customize and extend to meet your specific needs
- **Scalability**: Architecture designed for growth and maintainability
- **Developer Experience**: Intuitive API and comprehensive documentation
- **TypeScript Support**: Full type definitions for enhanced developer experience

## 📚 Learn More

Visit our [official documentation](http://gothamjs.io) for comprehensive guides, API references, and examples.

## 📦 Related Packages

- [@nlabs/arkhamjs](https://github.com/nitrogenlabs/arkhamjs) - Flux implementation
- [@nlabs/lex](https://github.com/nitrogenlabs/lex) - Build and development tools

## 📄 License

GothamJS is [MIT licensed](./LICENSE).
