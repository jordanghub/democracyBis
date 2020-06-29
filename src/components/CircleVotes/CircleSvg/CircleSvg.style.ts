import styled from 'styled-components';
import { ICircleSvgStyle } from './interface';

export const CircleSvgStyle = styled.circle<ICircleSvgStyle>`
  /* positionnement en bas */
  /* transition: stroke-dashoffset 0.35s;
  transform: rotate(90deg) rotateY(180deg);
  transform-origin: 50% 50%; */
  /* transform-origin: 50% 50%; */
  /* transform: translateX(90deg); */
  stroke-linecap: round;
  stroke-dashoffset: ${(props) => props.offset || 0};
  stroke-dasharray: ${(props) =>
    (props.rad * 2 * Math.PI).toString() +
    ' ' +
    (props.rad * 2 * Math.PI).toString()};
`;
