import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        'src/**/*.stories.{ts,tsx}',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/components/Chat/**',
        'src/components/Notify/NotifyExample.tsx',
        'src/views/Gotham/GothamProvider.tsx',
        'src/views/Gotham/GothamRoot.tsx'
      ],
      include: [
        'src/components/**/*.{ts,tsx}',
        'src/views/**/*.{ts,tsx}'
      ],
      provider: 'v8',
      thresholds: {
        branches: 75,
        functions: 85,
        lines: 90,
        statements: 90
      }
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts']
  }
});
