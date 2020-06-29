import { ReactNode } from 'react';

export interface LinkProps {
  to: string;
  children: ReactNode;
  visibleLink?: string;
  isButton?: boolean;
}
