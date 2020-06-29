import styled from 'styled-components';
import { TextField } from '@material-ui/core';

export const Wrapper = styled(TextField)`
  & label.Mui-focused {
    color: ${(props) => props.theme.formInput.borderColor};
  }

  & .MuiInputBase-root::after {
    border-color: ${(props) => props.theme.formInput.borderColor};
  }
`;
