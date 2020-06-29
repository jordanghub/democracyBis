import React from 'react';
import {
  Paper,
  MenuItem,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { LabelOutlined, DescriptionOutlined } from '@material-ui/icons';
import { LinkComponent } from 'components';
import * as Styled from './SearchResult.style';
import { ISearchResultProps } from './interface';

export const SearchResult = ({
  isMenuOpen,
  menuRef,
  handleClose,
  input,
  categories,
  searchResult,
}: ISearchResultProps) => {
  const categoriesResult = categories
    ?.filter((cat) => cat.name.toLowerCase().includes(input.toLowerCase()))
    .map((category) => (
      <MenuItem key={category.name} onClick={handleClose}>
        <LabelOutlined fontSize="small" />
        <LinkComponent
          to={`/categories/[slug]`}
          visibleLink={`/categories/${category.id}`}
        >
          {category.name}
        </LinkComponent>
      </MenuItem>
    ));
  const threadResults = searchResult?.map((thread) => (
    <MenuItem key={thread.id} onClick={handleClose}>
      <DescriptionOutlined fontSize="small" />
      <LinkComponent
        to={`/thread/[slug]`}
        visibleLink={`/thread/${thread.slug}`}
      >
        {thread.title.slice(0, 25)}...
      </LinkComponent>
    </MenuItem>
  ));

  return (
    <Styled.SearchResult
      id="nav-search-results"
      open={isMenuOpen}
      anchorEl={menuRef.current}
      disablePortal
    >
      <Paper elevation={6} component="ul">
        {threadResults &&
          threadResults.length === 0 &&
          (!categoriesResult || categoriesResult.length === 0) && (
            <Typography variant="h6" component="p" align="center">
              Aucun résultat
            </Typography>
          )}
        {!searchResult && <CircularProgress size={40} />}
        {threadResults}
        {categoriesResult}
        <a href="#">Voir plus</a>
      </Paper>
    </Styled.SearchResult>
  );
};
