import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    // localStorage needs a non-opaque origin in jsdom.
    environmentOptions: { jsdom: { url: 'http://localhost/' } },
  },
});
