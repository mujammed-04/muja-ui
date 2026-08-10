/** Test-only stand-in for `react-native-safe-area-context`. */
import type { ReactNode } from 'react';

export const useSafeAreaInsets = () => ({ top: 44, right: 0, bottom: 34, left: 0 });

export const SafeAreaProvider = ({ children }: { children?: ReactNode }) => <>{children}</>;

export const SafeAreaView = ({ children, ...rest }: { children?: ReactNode }) => (
  <div data-rn="SafeAreaView" {...rest}>
    {children}
  </div>
);
