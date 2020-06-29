import { Grid, Popper } from '@material-ui/core';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  padding: 1rem 0;

  margin-left: auto;
  @media screen and (min-width: 600px) {
    margin-left: 0.5rem;
    padding: 0;
  }
  @media screen and (min-width: 1024px) {
    margin-left: 0;
  }
`;

export const Menu = styled(Popper)`
  min-width: 200px;
  z-index: 9999;

  & a {
    text-transform: capitalize;
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const MenuToggle = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const UserData = styled(Grid)`
  padding: 0.5rem;
  & p {
    margin-left: 0.5rem;
  }
`;
