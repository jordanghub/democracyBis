import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const Wrapper = styled.div`
  padding: 1rem;
  max-width: 100%;

  & p {
    font-weight: 500;
  }
`;

export const CloseButton = styled.div`
  display: flex;
  align-items: center;
  text-align: right;
`;

export const ShowWithoutTabsHeader = styled(Grid)`
  margin-bottom: 1rem;
`;
