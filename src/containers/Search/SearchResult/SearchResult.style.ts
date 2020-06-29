import styled from 'styled-components';
import { Popper } from '@material-ui/core';

export const SearchResult = styled(Popper)`
  width: 100%;
  & ul {
    margin-top: 0;
    padding-left: 0;
  }

  & a {
    text-transform: capitalize;
    margin-left: 0.2rem;
  }
  & .MuiCircularProgress-root {
    margin: auto;
    display: block;
  }
`;
