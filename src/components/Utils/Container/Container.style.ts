import styled from 'styled-components';
import { Container } from '@material-ui/core';

export const Wrapper = styled(Container)`
  &.MuiContainer-root {
    margin-top: 1rem;

    padding-left: 8px;
    padding-right: 8px;
    @media screen and (min-width: 600px) {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
`;
