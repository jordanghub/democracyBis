import React from 'react';

import * as Styled from './Container.style';
import { ContainerProps } from './interface';

export const Container = ({
  children,
  component = 'div',
  maxWidth = 'md',
}: ContainerProps) => (
  <Styled.Wrapper component={component} maxWidth={maxWidth}>
    {children}
  </Styled.Wrapper>
);
