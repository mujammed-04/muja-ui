import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: { index: 'src/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
  },
  {
    // Separate entry so only stateful components carry the client directive;
    // the main entry stays React Server Components-safe (same as @muja-ui/core).
    entry: { client: 'src/client.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: false,
    // No treeshake here: tsup's rollup pass strips the "use client" directive
    // that esbuild preserves from the source entry.
  },
]);
