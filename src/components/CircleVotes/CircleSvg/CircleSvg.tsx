import React from 'react';
import { ICircleSvgProps } from './interface';
import * as Styled from './CircleSvg.style';

export const CircleSvg = ({ r, color, value }: ICircleSvgProps) => {
  const circumference = r * 2 * Math.PI;
  const offset =
    circumference - ((value <= 0 ? 1 : value) / 100 / 4) * circumference;

  return (
    <Styled.CircleSvgStyle
      rad={r}
      cx="51%"
      cy="51%"
      offset={offset}
      stroke={color}
      strokeWidth="3"
      fill="transparent"
      r={r}
    />
  );
};
