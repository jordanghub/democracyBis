import { DefaultTheme } from 'styled-components';
import { IColorTheme } from '../interface';
import { theme } from './baseTheme';

export const darkTheme: DefaultTheme & IColorTheme = {
  ...theme,
  default: {
    textColor: 'white',
    background: 'rgb(47,49,54)',
    paperColor: 'rgb(54,57,63)',
    navBackground: 'teal',
    iconColor: 'white',
  },
  threadHomepage: {
    categoryBackground: 'teal',
  },
  threadSelection: {
    background: 'rgb(54,57,63)',
    color: 'white',
    iconColor: 'teal',
    borderColor: 'teal',
    threadHighlightColor: 'teal',
  },
  threadLock: {
    background: 'transparent',
    color: 'rgb(255,0,0)',
    iconColor: 'rgb(255,0,0)',
  },
  formInput: {
    borderColor: 'white',
  },
};
