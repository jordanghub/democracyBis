import styled from 'styled-components';

export const Wrapper = styled.a`
  color: ${(props) => props.theme.default.textColor};
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`;
