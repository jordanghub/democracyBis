import { NextPage } from 'next';

import { BaseLayout } from 'containers';
import { Typography, CircularProgress } from '@material-ui/core';
import { Container, ThreadHomepage } from 'components';
import { SearchInput } from 'containers/Search';
import { useSelector, useDispatch } from 'react-redux';
import { TState } from 'types/state';
import { useCallback, useState, useEffect } from 'react';
import { searchThread, changeSearchThreadResult } from 'store/actions';
import { Pagination } from 'components/Utils/Pagination';

interface ISearchProps {
  searchValue?: string;
}

const Search: NextPage<ISearchProps> = ({ searchValue }) => {
  const [inputVal, changeInputVal] = useState(searchValue || '');

  const dispatch = useDispatch();

  const searchResult = useSelector(
    (state: TState) => state.thread.searchResults,
  );

  const paginationData = useSelector(
    (state: TState) => state.pagination['search-result'],
  );

  const changeSearchResultAction = useCallback(
    (payload) => dispatch(changeSearchThreadResult(payload)),
    [dispatch],
  );

  const scoringCategories = useSelector(
    (state: TState) => state.votes.scoringCategories,
  );
  const searchThreadAction = useCallback(
    (payload) => dispatch(searchThread(payload)),
    [dispatch],
  );

  const handlePageChange = useCallback(
    (evt, page: number) => {
      if (page + 1 <= paginationData.pages) {
        changeSearchResultAction({ searchResult: null });
        searchThreadAction({
          search: inputVal,
          full: true,
          page: page + 1,
        });
      }
    },
    [paginationData],
  );

  useEffect(() => {
    if (searchValue && searchValue.length >= 3) {
      searchThreadAction({ search: searchValue, full: true });
    }

    return () => {
      changeSearchResultAction({ searchResult: null });
    };
  }, []);

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    changeInputVal(evt.target.value);
    if (searchResult) {
      changeSearchResultAction({ searchResult: null });
    }

    if (evt.target.value.length >= 3) {
      searchThreadAction({ search: evt.target.value, full: true });
    }
  };

  const threadList = searchResult?.map((thread) => (
    <ThreadHomepage
      slug={thread.slug}
      key={thread.id}
      id={thread.id}
      title={thread.title}
      author={thread.author}
      date={thread.createdAt}
      categories={thread.categories}
      votes={thread.votes}
      messageType="thread"
      withAvatar
      scoringCategories={scoringCategories}
    />
  ));

  return (
    <BaseLayout title="Rechercher">
      <Container>
        <Typography variant="h4">Effectuer une recherche</Typography>
        <div style={{ position: 'relative' }}>
          <SearchInput
            inputValue={inputVal}
            handleInputChange={handleInputChange}
            handleInputClick={() => {}}
          />
        </div>

        {!threadList && inputVal.length >= 3 && (
          <div>
            <CircularProgress />
          </div>
        )}

        {threadList && threadList.length === 0 && (
          <Typography variant="h5">Aucun résultat</Typography>
        )}

        {threadList && threadList.length > 0 && (
          <>
            {threadList}
            <Pagination
              count={paginationData.count}
              page={
                paginationData.currentPage > 0
                  ? paginationData.currentPage - 1
                  : 0
              }
              pageSize={5}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Container>
    </BaseLayout>
  );
};

Search.getInitialProps = async (ctx) => {
  const { value } = ctx.query;

  return {
    searchValue: value as string,
  };
};
export default Search;
