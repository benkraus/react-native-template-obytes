import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@\//, replacement: `${path.resolve(__dirname, './src')}/` },
      // Avoid parsing React Native's Flow sources in Node-based unit tests.
      // For unit tests we render via React Test Renderer, and RN Web is sufficient.
      { find: /^react-native$/, replacement: 'react-native-web' },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/?(*.)+(spec|test).ts?(x)'],
    server: {
      deps: {
        // Ensure Node doesn't `require()` externalized deps that may reference `react-native`.
        // We rely on Vite's resolver so `react-native` can be aliased to `react-native-web`.
        inline: true,
      },
    },
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['json-summary', 'lcov', 'text'],
      exclude: [
        '**/coverage/**',
        '**/node_modules/**',
        '**/docs/**',
        '**/cli/**',
        '**/babel.config.js',
        '**/metro.config.js',
        '**/vitest.config.ts',
        '**/vitest.setup.ts',
      ],
    },
  },
});
