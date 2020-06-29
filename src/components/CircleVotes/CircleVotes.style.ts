import styled from 'styled-components';

export const CircleComponentStyle = styled.svg`
  /* positionné en bas */
  /* bottom: 1rem;
  right: 1rem; */
  /* transform: translate(50%, 50%); */
  transform: translate(50%, -50%) rotateY(180deg);
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: 0;
  right: 0;
  /* transform: translate(0%, 0%) rotateY(180deg); */
  position: absolute;
`;
