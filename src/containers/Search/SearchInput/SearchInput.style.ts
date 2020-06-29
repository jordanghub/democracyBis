import styled from 'styled-components';
import { InputBase } from '@material-ui/core';

export const NavSearchIcon = styled.div`
  width: 30px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavSearchInput = styled(InputBase)`
  padding-left: 30px !important;

  color: white !important;

  &::placeholder {
    color: white !important;
  }

  & input {
    width: 100%;
  }

  @media screen and (min-width: 1024px) {
    padding: 0.5rem;
    & input {
      width: 200px;
      transition: width 1500ms;
    }
    & input:focus {
      width: 350px;
    }
  }
`;
