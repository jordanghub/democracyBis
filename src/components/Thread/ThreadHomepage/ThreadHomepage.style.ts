import styled from 'styled-components';
import { Paper, Typography, Chip, ChipProps } from '@material-ui/core';

interface IWrapperProps {
  voteAverage?: number;
  voteColor?: string;
}

export const Wrapper = styled(Paper)<IWrapperProps>`
  margin-top: 1rem;
  padding: 1rem;

  & .Avatar-user {
    margin-top: 0.8rem;
  }
`;

export const Title = styled(Typography)``;

export const Categories = styled.div`
  margin-top: 0.8rem !important;
  & a:nth-child(n + 2) {
    margin-left: 0.5rem;
  }
`;

export const ChipStyle = styled(Chip)`
  &.MuiChip-root {
    background-color: ${(props) =>
      props.theme.threadHomepage.categoryBackground};
  }
  margin-top: 0.5rem;
` as typeof Chip;
