import { ReactNode } from 'react';

export interface BaseLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  statusCode?: number;
}
