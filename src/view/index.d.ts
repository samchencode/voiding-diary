import type { ReactNode } from 'react';
import type * as svg from 'react-native-svg';

declare module 'react-native-svg' {
  export interface TextProps extends svg.TextProps {
    children: JSX.Element | string | (JSX.Element | string)[];
  }

  export interface GProps extends svg.GProps {
    children: ReactNode;
  }
}
