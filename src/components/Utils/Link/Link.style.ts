import styled from 'styled-components';

export const LinkStyle = styled.a`
  color: inherit;
  text-decoration: none;

  &:visited {
    color: inherit;
  }
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  & .MuiChip-root {
    &:hover {
      cursor: pointer;
    }
  }
`;
