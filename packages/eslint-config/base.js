import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // `tsup.config.bundled_*.mjs` is a scratch file tsup writes next to the
  // config while it builds and deletes when it finishes. turbo runs `build` and
  // `lint` in parallel, so ESLint can enumerate that name and then fail to open
  // it — an ENOENT on a file with a random hash in it, from whichever package
  // happened to be mid-build. Never lint it.
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'node_modules/**',
      '**/tsup.config.bundled_*.mjs',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
);
