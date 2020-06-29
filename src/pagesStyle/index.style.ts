import styled from 'styled-components';
import { Modal } from '@material-ui/core';

export const ThreadModal = styled(Modal)`
  overflow: auto;
  & .MuiContainer-root {
    margin-top: 0;
    background: ${(props) => props.theme.default.background};
    padding: 1rem;
  }
`;
