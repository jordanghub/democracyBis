import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';

export const Header = styled(Grid)`
  margin-bottom: 1rem;
  margin-top: 1rem;
  & .thread-message-actions {
    & svg {
      color: ${(props) => props.theme.default.iconColor};
    }
    align-items: flex-start;
    flex-direction: row;
    @media screen and (min-width: 600px) {
      justify-content: flex-start;
    }
  }
`;

export const Date = styled(Typography)`
  color: teal;
  font-size: 0.8rem;
  margin-left: 0.5rem !important;
`;
