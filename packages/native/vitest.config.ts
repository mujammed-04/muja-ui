import { defineConfig } from 'vitest/config';

/** Absolute path to a stub module under `test/`. */
const stub = (file: string) => new URL(`./test/${file}`, import.meta.url).pathname;

export default defineConfig({
  test: {
    environment: 'jsdom',
    environmentOptions: { jsdom: { url: 'http://localhost/' } },
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      // See test/react-native-stub.tsx for why the real packages can't load here.
      'react-native-safe-area-context': stub('safe-area-context-stub.tsx'),
      'react-native-svg': stub('react-native-svg-stub.tsx'),
      'react-native': stub('react-native-stub.tsx'),
    },
  },
});
