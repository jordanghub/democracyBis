import styled from 'styled-components';
import { Alert } from '@material-ui/lab';

export const Wrapper = styled.div``;

export const Messages = styled.div``;

export const NotLoggedInMessage = styled.div`
  margin-top: 1rem;
`;

export const LockedMessage = styled(Alert)`
  & div.MuiAlert-icon {
    color: ${(props) => props.theme.threadLock.iconColor};
  }
  &.MuiAlert-standardError {
    background: ${(props) => props.theme.threadLock.background};
    color: ${(props) => props.theme.threadLock.color};
    padding-left: 0;
  }
  margin-top: 1rem;
`;
