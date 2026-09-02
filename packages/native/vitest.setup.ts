import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { __setPlatformOS } from './test/react-native-stub';

// Testing Library only auto-cleans when vitest runs with `globals: true`.
afterEach(() => {
  cleanup();
  // Tests default to the iOS branch; one that flips to Android must not leak.
  __setPlatformOS('ios');
});
