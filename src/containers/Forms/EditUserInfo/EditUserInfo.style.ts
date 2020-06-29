import styled from 'styled-components';

export const Form = styled.form`
  margin-top: 1rem;

  & .MuiFormControl-root:nth-child(n + 2) {
    margin-top: 1rem;
  }
  & .MuiButtonBase-root {
    margin-top: 1rem;
  }
`;

export const FormWrapper = styled.div`
  & .MuiAlert-root {
    margin-top: 1rem;
  }
`;
