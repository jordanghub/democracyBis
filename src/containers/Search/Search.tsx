import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as Styled from './Search.style';
import { useDispatch, useSelector } from 'react-redux';
import { searchThread, changeSearchThreadResult } from 'store/actions';
import { SearchInput } from './SearchInput';
import { SearchResult } from './SearchResult';
import { TState } from 'types/state';

export const Search = () => {
  const dispatch = useDispatch();

  const menuRef = useRef<null | HTMLDivElement>(null);
  const [isMenuOpen, changeIsMenuOpen] = useState(false);
  const [input, changeInput] = useState('');

  const searchResult = useSelector(
    (state: TState) => state.thread.searchResults,
  );
  const categories = useSelector((state: TState) => state.thread.categories);

  const searchThreadAction = useCallback(
    (payload) => dispatch(searchThread(payload)),
    [dispatch],
  );

  const changeSearchResultAction = useCallback(
    (payload) => dispatch(changeSearchThreadResult(payload)),
    [dispatch],
  );

  const handleInputClick = () => {
    if (input.length > 3 && !isMenuOpen) {
      changeIsMenuOpen(true);
    }
  };

  const handleClose = () => {
    changeIsMenuOpen(false);
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    changeInput(evt.target.value);
    if (evt.target.value.length > 3) {
      if (!isMenuOpen) {
        changeIsMenuOpen(true);
      }

      if (searchResult) {
        changeSearchResultAction({ searchResult: null });
      }

      searchThreadAction({ search: evt.target.value });
    } else if (isMenuOpen) {
      changeSearchResultAction({ searchResult: null });
      changeIsMenuOpen(false);
    }
  };

  const handleClickOut = (evt) => {
    if (isMenuOpen) {
      if (!menuRef.current.contains(evt.target)) {
        changeIsMenuOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOut);

    return () => document.removeEventListener('click', handleClickOut);
  }, [isMenuOpen]);

  return (
    <Styled.NavSearch ref={menuRef}>
      <SearchInput
        inputValue={input}
        handleInputChange={handleInputChange}
        handleInputClick={handleInputClick}
      />
      <SearchResult
        isMenuOpen={isMenuOpen}
        menuRef={menuRef}
        handleClose={handleClose}
        input={input}
        categories={categories}
        searchResult={searchResult}
      />
    </Styled.NavSearch>
  );
};
