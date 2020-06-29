import styled from 'styled-components';
import { Paper } from '@material-ui/core';

export const Wrapper = styled(Paper)`
  position: relative;
  margin-top: 1rem;
  padding: 1rem;
`;

export const HightlightedPart = styled.span`
  background-color: ${(props) =>
    props.theme.threadSelection.threadHighlightColor};
  color: white;
  padding: 0.3rem 0;
`;
