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

## Key Features

- **Unified Component Library**: Beautifully designed, fully customizable UI components with consistent styling and behavior
- **Seamless Routing & Transitions**: Built-in navigation system with smooth page transitions and animations
- **Integrated State Management**: Flux-based state handling that connects directly to your UI components
- **Form System**: Complete form components with validation, error handling, and accessibility features
- **Theming & Styling**: Light/dark mode support and customizable design system based on Tailwind CSS
- **Responsive Design**: Mobile-first components that adapt beautifully to any screen size
- **Internationalization**: Built-in i18n support for multilingual applications
- **Authentication Flows**: Ready-to-use authentication UI components and routing guards
- **Icon Library**: Complete Lucide React icon set available for use throughout your application

## 🚀 Getting Started

```bash
# Install GothamJS
npm install @nlabs/gothamjs

# Or with yarn
yarn add @nlabs/gothamjs
```

Create your first GothamJS application:

```jsx
import {createRoot} from 'react-dom/client';
import {Gotham} from '@nlabs/gothamjs';

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

## CSS and Styling

GothamJS uses Tailwind CSS with custom theme variables for consistent styling. To use GothamJS components with proper styling in your project, you need to import the GothamJS theme CSS.

### Importing GothamJS Styles

```css
/* Import GothamJS theme CSS in your main CSS file */
@import '@nlabs/gothamjs/styles/tailwind.css';
```

### Tailwind CSS v4 Configuration

Since GothamJS uses Tailwind CSS v4, configuration is done via CSS custom properties instead of a `tailwind.config.js` file. The GothamJS theme CSS already includes all the necessary color variables.

If you need to customize the theme further, you can override the CSS custom properties in your own CSS:

```css
/* In your main CSS file, after importing GothamJS styles */
@import '@nlabs/gothamjs/styles/tailwind.css';

/* Override GothamJS theme variables */
@theme {
  --color-primary: #your-custom-primary;
  --color-secondary: #your-custom-secondary;
}
```

### Content Paths

Tailwind CSS still needs to know which files to scan for class usage. Configure this in your build tool:

#### Webpack Configuration
```js
// webpack.config.js
module.exports = {
  // ... other webpack config
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss')({
                    content: [
                      './src/**/*.{js,ts,jsx,tsx}',
                      './node_modules/@nlabs/gothamjs/lib/**/*.{js,ts,jsx,tsx}'
                    ]
                  })
                ]
              }
            }
          }
        ]
      }
    ]
  }
};
```

#### Lex Configuration
```js
// lex.config.mjs
export default {
  // ... other config
  tailwindCssPath: './src/styles/main.css',
  tailwindContent: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nlabs/gothamjs/lib/**/*.{js,ts,jsx,tsx}'
  ]
};
```

#### Vite Configuration
```js
// vite.config.js
export default {
  css: {
    postcss: {
      plugins: [
        require('tailwindcss')({
          content: [
            './src/**/*.{js,ts,jsx,tsx}',
            './node_modules/@nlabs/gothamjs/lib/**/*.{js,ts,jsx,tsx}'
          ]
        })
      ]
    }
  }
}
```

### What Gets Imported

The GothamJS theme CSS includes:

- **Custom Color Palette**: Primary, secondary, neutral, success, error, warning, and info colors
- **Dark Mode Support**: Automatic dark mode variants for all colors
- **Typography**: Inter font family with proper font weights
- **Autofill Styles**: Browser autofill styling fixes for form inputs
- **Base Styles**: Essential CSS resets and utilities

### Using GothamJS Colors in Your Components

```jsx
// GothamJS colors are available as Tailwind classes
<div className="bg-primary text-white dark:bg-primary-dark dark:text-black-dark">
  Styled with GothamJS theme
</div>

// Or use them in custom CSS
.my-component {
  background-color: var(--color-primary);
  color: var(--color-white);
}
```

## Components

GothamJS provides a rich set of components to accelerate your development:

### Icons

GothamJS includes the complete [Lucide React](https://lucide.dev/) icon library, providing you with over 1000+ beautifully designed, customizable icons that follow a consistent design language.

#### Why Lucide React?

- **Consistent Design**: All icons follow the same design principles and stroke width
- **Customizable**: Easy to customize size, color, stroke width, and other properties
- **Accessible**: Built with accessibility in mind, including proper ARIA attributes
- **Tree Shakeable**: Only the icons you import are included in your bundle
- **TypeScript Support**: Full type definitions for all icons
- **Active Development**: Regularly updated with new icons and improvements

#### Quick Reference

- **Icon Gallery**: [Browse all available icons](https://lucide.dev/icons/)
- **Documentation**: [Lucide React documentation](https://lucide.dev/guide/packages/lucide-react)
- **GitHub**: [Lucide project on GitHub](https://github.com/lucide-icons/lucide)

#### Usage

```jsx
import { Camera, Heart, Star, Settings, LucideLoader } from '@nlabs/gothamjs/icons';

const MyComponent = () => (
  <div>
    <Camera size={24} />
    <Heart size={24} color="red" />
    <Star size={24} fill="yellow" />
    <Settings size={24} />
    <LucideLoader size={24} /> {/* Use LucideLoader to avoid conflict with GothamJS Loader component */}
  </div>
);
```

#### Icon Properties

All Lucide React icons support these common properties:

```jsx
<Camera
  size={24}           // Icon size in pixels
  color="currentColor" // Icon color
  strokeWidth={2}     // Stroke width
  fill="none"         // Fill color
  className="my-icon" // CSS classes
/>
```

> **Note**: The `Loader` icon from Lucide React is exported as `LucideLoader` to avoid conflicts with GothamJS's `Loader` component.

### Optimized Form Components

GothamJS provides optimized form components with automatic validation, accessibility features, and performance optimizations:

```jsx
import { Form, TextField, FormButton } from '@nlabs/gothamjs';
import { z } from 'zod';

// Define your form schema with Zod
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

const LoginForm = () => (
  <Form
    schema={loginSchema}
    onSubmit={handleSubmit}
    showErrors={true}        // Show form-level errors at top
    mode="onBlur"            // Validate on blur for better UX
  >
    {({isSubmitting, disabled}) => (
      <>
        <TextField
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
        />
        <FormButton
          type="submit"
          variant="contained"
          color="primary"
          label="Sign In"
        />
      </>
    )}
  </Form>
);
```

#### Key Features:

- **Automatic Validation**: Integrated Zod schema validation with react-hook-form
- **Performance Optimized**: Efficient re-rendering and validation triggering
- **Accessibility**: Proper ARIA attributes and form structure
- **Loading States**: Automatic submit button disabling during form submission
- **Error Handling**: Both field-level and form-level error display
- **Type Safety**: Full TypeScript support with inferred types

### Legacy Form Components

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

## State Management

GothamJS uses ArkhamJS, a Flux implementation, for state management:

```jsx
import {useFlux} from '@nlabs/arkhamjs-utils-react';
import {GothamActions} from '@nlabs/gothamjs';

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

## Routing

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

## Authentication

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

## Internationalization

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
import {useTranslation} from '@nlabs/gothamjs';

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

## Theming

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

## Configuration

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

## Why Choose GothamJS?

- **UI Consistency**: Create visually cohesive applications with a unified design language
- **Developer Experience**: Spend less time wiring up libraries and more time building features
- **Reduced Bundle Size**: One framework instead of multiple libraries means optimized bundle size
- **Seamless Transitions**: Built-in animations and transitions between routes and UI states
- **Accessibility**: Components designed with accessibility in mind from the start
- **Rapid Development**: Go from concept to production with significantly less boilerplate code
- **TypeScript Support**: Full type definitions for enhanced developer experience

## Learn More

Visit our [official documentation](http://gothamjs.io) for comprehensive guides, API references, and examples.

## Using with Lex

GothamJS works seamlessly with [Lex](https://github.com/nitrogenlabs/lex), Nitrogen Labs' build and development toolkit. Lex provides optimized building, testing, and development workflows for projects using GothamJS.

### Installation

```bash
# Install Lex globally
npm install -g @nlabs/lex

# Or install locally in your project
npm install --save-dev @nlabs/lex
```

### Lex Configuration

Create a `lex.config.mjs` file in your project root:

```js
export default {
  entryJs: 'src/index.tsx',     // Your main entry point
  outputPath: './dist',         // Build output directory
  useTypescript: true,          // Enable TypeScript support
  jest: {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jsdom'
  }
};
```

### Development Workflow

```bash
# Start development server with hot reload
lex dev

# Build for production
lex compile

# Run tests
lex test

# Lint and fix code
lex lint --fix

# Update dependencies
lex update --interactive
```

### Integration with GothamJS

Lex automatically detects GothamJS projects and configures Tailwind CSS integration. Your `lex.config.mjs` will include:

```js
export default {
  // ... other config
  tailwindCssPath: './src/styles/main.css',  // Your main CSS file
  // Lex will automatically include GothamJS in content paths
};
```

### Build Optimization

Lex optimizes GothamJS builds by:

- **Tree Shaking**: Removes unused GothamJS components from your bundle
- **CSS Optimization**: Processes Tailwind CSS with GothamJS theme variables
- **TypeScript Compilation**: Optimized compilation with proper type checking
- **Asset Handling**: Automatic copying of GothamJS assets and fonts

### Example Project Structure

```
my-gothamjs-app/
├── src/
│   ├── index.tsx
│   ├── App.tsx
│   ├── styles/
│   │   └── main.css
│   └── components/
├── lex.config.mjs
├── package.json
└── tsconfig.json
```

### CSS Setup with Lex

In your `src/styles/main.css`:

```css
@import '@nlabs/gothamjs/styles/tailwind.css';

/* Your custom styles */
@theme {
  /* Override GothamJS theme variables if needed */
}
```

Lex will automatically process this CSS file and include it in your build output.

## License

GothamJS is [MIT licensed](./LICENSE).
