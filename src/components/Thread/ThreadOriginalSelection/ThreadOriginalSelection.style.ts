import styled from 'styled-components';
import { Alert } from '@material-ui/lab';

export const Wrapper = styled(Alert)`
  & div.MuiAlert-icon {
    color: ${(props) => props.theme.threadSelection.iconColor};
  }

  &.MuiAlert-standardInfo {
    background: ${(props) => props.theme.threadSelection.background};
    color: ${(props) => props.theme.threadSelection.color};
    border: 1px solid ${(props) => props.theme.threadSelection.borderColor};
  }
`;
