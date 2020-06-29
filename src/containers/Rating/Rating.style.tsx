import React from 'react';
import styled from 'styled-components';
import { Popper, PopperProps } from '@material-ui/core';
import { IPopperStyleProps } from './interface';
export const Wrapper = styled.div`
  & .MuiTabsContainer {
    z-index: 1200;
  }

  & .MuiSvgIcon-root {
    color: ${(props) => props.theme.default.iconColor};
  }
`;
export const PoperRating = styled(
  ({ state, fadeDuration, ...rest }: PopperProps & IPopperStyleProps) => (
    <Popper {...rest} />
  ),
)`
  transition: opacity
    ${({ fadeDuration }) => (fadeDuration ? fadeDuration : 500)}ms;
  opacity: 0;

  opacity: ${({ state }) =>
    state === 'entering' || state === 'entered' ? 1 : 0};
  position: relative;
  min-width: 320px;
`;
