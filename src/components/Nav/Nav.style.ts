import styled from 'styled-components';
import { Grid, Popper } from '@material-ui/core';

export const MenuCategories = styled(Popper)`
  z-index: 2000;
`;

export const Wrapper = styled.div`
  & .MuiAppBar-root {
    flex-grow: 1;
  }

  & .MuiButton-root {
    color: white;
    cursor: pointer;
  }

  & #nav-category-button {
    display: flex;
    align-items: center;
  }

  & a {
    color: inherit;
    text-decoration: none;
    text-transform: uppercase;
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
  }

  & #menu-categories,
  #nav-user-menu {
    min-width: 200px;
  }

  & #menu-categories a {
    text-transform: capitalize;
  }

  #desktop-nav {
    display: none;
  }

  & header {
    background: ${(props) => props.theme.default.navBackground};
  }

  @media screen and (min-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    #desktop-nav {
      display: flex;
    }
    /* #nav-mobile-button-toggle {
      display: none;
    } */
  }

  color: white;
`;

export const SearchContainer = styled(Grid)`
  padding-bottom: 1rem;
  @media screen and (min-width: 600px) {
    padding-bottom: 0rem;
  }
`;
