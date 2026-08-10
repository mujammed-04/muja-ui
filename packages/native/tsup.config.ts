import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  // React Native is always a peer, resolved by Metro from the app.
  external: ['react', 'react-native', 'react-native-safe-area-context', 'react-native-svg'],
  treeshake: true,
});
