import { ReactNode } from 'react';

export interface ContainerProps {
  children: ReactNode;
  component?: any;
  maxWidth?: false | 'md' | 'xs' | 'sm' | 'lg' | 'xl';
}
