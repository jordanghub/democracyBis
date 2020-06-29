import { DefaultTheme } from 'styled-components';
import { IColorTheme } from '../interface';

import { theme } from './baseTheme';

export const lightTheme: DefaultTheme & IColorTheme = {
  ...theme,
  default: {
    textColor: 'black',
    background: 'white',
    paperColor: 'white',
    navBackground: '#3f51b5',
    iconColor: 'teal',
  },
  threadHomepage: {
    categoryBackground: '#e0e0e0',
  },
  threadSelection: {
    background: 'rgb(232, 244, 253)',
    color: 'rgb(13, 60, 97)',
    iconColor: '#2196f3',
    borderColor: 'transparent',
    threadHighlightColor: 'teal',
  },
  threadLock: {
    background: 'transparent',
    color: 'rgb(97, 26, 21)',
    iconColor: '#f44336',
  },
  formInput: {
    borderColor: '#3f51b5',
  },
};
