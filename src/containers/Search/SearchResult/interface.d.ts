export interface ISearchResultProps {
  isMenuOpen: boolean;
  menuRef: {
    current: null | HTMLDivElement;
  };
  handleClose: any;
  input: string;
  categories?: any[];
  searchResult?: any[];
}
