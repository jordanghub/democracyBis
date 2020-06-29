import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const Wrapper = styled.div`
  margin-top: 0.5rem;
`;

export const SourceList = styled.div``;

export const SourceItem = styled(Grid)`
  margin-top: 0.5rem;
`;

export const SourceInput = styled(Grid)`
  margin-top: 1rem;
  & label.Mui-focused {
    color: ${(props) => props.theme.formInput.borderColor};
  }

  & .MuiInputBase-root::after {
    border-color: ${(props) => props.theme.formInput.borderColor};
  }
`;
