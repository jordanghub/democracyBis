import React from 'react';
import { Search as SearchIcon } from '@material-ui/icons';
import * as Styled from './SearchInput.style';

export const SearchInput = ({
  inputValue,
  handleInputChange,
  handleInputClick,
}) => {
  return (
    <>
      <Styled.NavSearchIcon>
        <SearchIcon />
      </Styled.NavSearchIcon>
      <Styled.NavSearchInput
        placeholder="Rechercher..."
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleInputChange}
        value={inputValue}
        onClick={handleInputClick}
      />
    </>
  );
};
