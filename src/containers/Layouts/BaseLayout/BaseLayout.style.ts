import styled from 'styled-components';
import { LinearProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export const DarkModeToggle = styled.div`
  margin-top: 1rem;
  text-align: right;
  position: fixed;
  bottom: 1rem;
  right: 0.5rem;
  z-index: 999;

  & svg {
    width: 30px;
    height: 30px;
  }

  & .MuiToggleButton-root {
    background: white;
    margin-right: 1rem;
  }
`;

export const Wrapper = styled.div`
  background: ${(props) => props.theme.default.background};
  color: ${(props) => props.theme.default.textColor};
  min-height: 100vh;
`;

export const Loading = styled(LinearProgress)`
  position: absolute !important;
  top: 0 !important;
  width: 100%;
  height: 2px;
`;
export const FlashMessage = styled(Alert)`
  position: absolute !important;
  width: 100%;
`;
