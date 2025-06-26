declare module 'react-native-math-view' {
  import * as React from 'react';
  import { ViewProps } from 'react-native';

  export interface MathViewProps extends ViewProps {
    math: string; // LaTeX or MathML string
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
    style?: any;
  }

  const MathView: React.FC<MathViewProps>;

  export default MathView;
}