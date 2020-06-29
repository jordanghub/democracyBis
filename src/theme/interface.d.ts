export interface ITheme {
  baseSpacing: string;
}

export interface IColorTheme extends ITheme {
  default: {
    textColor: string;
    background: string;
    paperColor: string;
    navBackground: string;
    iconColor: string;
  };
  threadHomepage: {
    categoryBackground: string;
  };
  threadSelection: {
    background: string;
    color: string;
    iconColor: string;
    borderColor: string;
    threadHighlightColor: string;
  };
  threadLock: {
    background: string;
    color: string;
    iconColor: string;
  };
  formInput: {
    borderColor: string;
  };
}
