import styled from 'styled-components';

export const Form = styled.form`
  margin-top: 1rem;
  color: ${(props) => props.theme.default.textColor};

  & .MuiButtonBase-root {
    margin-top: 1rem;
  }
`;
