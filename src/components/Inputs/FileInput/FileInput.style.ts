import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 1rem;
  & input {
    display: none;
  }
`;

export const FilePreview = styled.div`
  margin-top: 1rem;
  width: 50px;
  height: auto;

  & img {
    width: 100%;
    height: auto;
  }
`;
