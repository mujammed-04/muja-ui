import react from '@muja-ui/eslint-config/react';

export default [
  ...react,
  { ignores: ['storybook-static/**'] },
  {
    files: ['**/*.stories.tsx'],
    rules: {
      // Stories are demos: local hooks and inline handlers are the point.
      'no-console': 'off',
    },
  },
];
