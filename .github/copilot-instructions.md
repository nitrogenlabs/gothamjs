# GothamJS AI Coding Assistant Instructions

## Project Overview
GothamJS is a comprehensive React-based UI framework that integrates components, routing, state management, and transitions. It uses ArkhamJS (Flux implementation) for state management, React Router for navigation, react-hook-form + Zod for forms, i18next for internationalization, and TailwindCSS for styling.

## Architecture Patterns

### Configuration-Driven Setup
- Apps are configured via `GothamProvider` with a config object containing routes, translations, theme, and middleware
- Example: `src/app.tsx` shows the main app configuration with routes, translations, and UI props
- Routes are defined as nested objects with `path`, `element`, `props`, and optional `authenticate` flag

### Flux State Management
- Uses ArkhamJS Flux implementation with actions, stores, and middleware
- Actions are dispatched via `Flux.dispatch()` with constants from `GothamConstants`
- Stores are pure functions that handle state updates based on action types
- Example: `GothamActions` provides methods like `navGoto()`, `notify()`, `loading()`

### Component Patterns
- Components follow React functional component patterns with TypeScript
- Form components use `react-hook-form` with Zod validation schemas
- Icons use Lucide React (imported as `LucideLoader` to avoid conflicts)
- Styling uses TailwindCSS with custom theme variables defined in `src/styles/tailwind.css`

## Development Workflow

### Build Commands
- `npm run dev` / `lex dev` - Start development server with hot reload
- `npm run build` / `lex compile` - Build production bundle to `lib/`
- `npm run test` / `lex test` - Run Jest tests
- `npm run lint` / `lex lint` - Lint and fix code
- `npm run storybook` / `lex storybook` - Start Storybook for component development

### File Organization
- `src/` - Source TypeScript/React code
- `src/components/` - Reusable UI components (Button, Form, TextField, etc.)
- `src/views/` - Page-level components and layouts
- `src/actions/` - Flux action creators
- `src/stores/` - Flux stores for state management
- `src/constants/` - Action type constants
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions and helpers
- `lib/` - Compiled output (auto-generated)

### Key Files
- `src/app.tsx` - Main app entry point with configuration
- `src/views/Gotham/GothamProvider.tsx` - Core provider that initializes Flux, routing, and i18n
- `src/actions/GothamActions.ts` - Main action creators for navigation, notifications, loading
- `src/stores/GothamAppStore.ts` - App-level state store
- `lex.config.mjs` - Build configuration for @nlabs/lex

## Coding Conventions

### TypeScript
- Use `.tsx` for React components, `.ts` for utilities
- Strict null checks enabled, but `noImplicitAny: false`
- Base URL set to `./src` for clean imports
- Export types alongside implementations

### Comments
- Do not write comments in code except for TODOs, copyrights, and lint disables
- Variables and code should be self-explanatory with clear, descriptive names
- Use meaningful variable names that explain their purpose
- Structure code to be readable without additional comments

### Component Structure
```tsx
export interface ComponentProps {
  readonly propName: string;
}

export const ComponentName: FC<ComponentProps> = ({propName}) => {
  // Implementation
};
```

### Form Handling
- Use `Form` component with Zod schema validation
- Access form methods via `FormProvider` in child components
- Example: `src/components/Form/Form.tsx`

### State Management
- Dispatch actions through `GothamActions` for global state
- Use `useFlux()` hook from ArkhamJS for Flux integration
- Listen to store changes via Flux event system

### Styling
- Use TailwindCSS classes with custom theme variables
- Dark mode support via `dark:` variants
- Custom colors defined in `src/styles/tailwind.css`

## Common Patterns

### Adding New Components
1. Create component in `src/components/ComponentName/`
2. Export from `src/components/index.ts`
3. Add Storybook story in `src/stories/`
4. Update TypeScript types in `src/types/`

### Navigation
- Use `GothamActions.navGoto(path)` for programmatic navigation
- Define routes in config with authentication guards
- Use React Router hooks (`useNavigate`, `useParams`) in components

### Notifications
- Use `GothamActions.notify({message, severity})` for user feedback
- Severity options: 'success', 'error', 'warning', 'info'

### Loading States
- Use `GothamActions.loading(true, 'Loading message')` to show global loader
- Automatically managed by the framework

### Internationalization
- Use `useTranslation()` hook from react-i18next
- Translations defined in config object
- Keys follow dot notation: `t('buttons.submit')`

## Testing
- Use Jest with jsdom environment
- Test components with @testing-library/react
- Mock ResizeObserver and matchMedia in `jest.setup.js`
- Run tests with `npm test`

## Deployment
- Built output goes to `lib/` directory
- Package exports defined in `package.json` for different entry points
- Use `npm run prepublishOnly` for pre-publish checks