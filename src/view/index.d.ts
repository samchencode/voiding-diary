import type { ReactNode } from 'react';
import type * as svg from 'react-native-svg';

declare module 'react-native-svg' {
  export interface TextProps extends svg.TextProps {
    children: JSX.Element | string | number | (JSX.Element | number | string)[];
  }

  export interface GProps extends svg.GProps {
    children: ReactNode;
  }
}
