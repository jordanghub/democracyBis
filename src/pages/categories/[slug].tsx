export const dfhjqsdkjfh = 'dshfjklshdfksh';

import { memo, useCallback } from 'react';

import { Container, ThreadHomepage } from 'components';
import { NextPage, NextPageContext } from 'next';
import { Store } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { TState } from 'types/state';
import { Typography } from '@material-ui/core';
import { BaseLayout } from 'containers';
import { Pagination } from 'components/Utils/Pagination';
import { fetchThreadsByCategory } from 'store/actions';
import { useRouter } from 'next/router';

const Category: NextPage = memo(() => {
  const router = useRouter();
  const dispatch = useDispatch();

  const threads = useSelector((state: TState) => state.thread.categoryThreads);

  const scoringCategories = useSelector(
    (state: TState) => state.votes.scoringCategories,
  );

  const paginationData = useSelector(
    (state: TState) => state.pagination['category-threads'],
  );
  const categories = useSelector((state: TState) => state.thread.categories);

  const category = categories.find(
    (cat) => cat.id === Number(router.query.slug),
  );

  const threadList = threads?.map((thread) => (
    <ThreadHomepage
      slug={thread.slug}
      key={thread.id}
      id={thread.id}
      title={thread.title}
      author={thread.author}
      date={thread.createdAt}
      categories={thread.categories}
      messageType="thread"
      votes={thread.votes}
      scoringCategories={scoringCategories}
      withAvatar
    />
  ));

  const fethLatestThreadsAction = useCallback(
    (payload) => dispatch(fetchThreadsByCategory(payload)),
    [dispatch],
  );

  const handlePageChange = useCallback(
    (evt, page: number) => {
      if (page + 1 <= paginationData.pages) {
        fethLatestThreadsAction({
          page: page + 1,
          categoryId: router.query.slug,
        });
      }
    },
    [paginationData],
  );

  return (
    <BaseLayout>
      <Container>
        {(!threadList || threadList.length === 0) && (
          <Typography variant="h4" component="h2">
            Aucun résultat
          </Typography>
        )}
        {threadList && threadList.length > 0 && (
          <>
            <Typography variant="h4" component="h2">
              Threads de la catégorie {category?.name.toLowerCase()}
            </Typography>
            {threadList}
            {paginationData && (
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
            )}
          </>
        )}
      </Container>
    </BaseLayout>
  );
});

Category.getInitialProps = async ({
  store,
  query,
}: NextPageContext & { store: Store }) => {
  store.dispatch(
    fetchThreadsByCategory({ page: 1, categoryId: Number(query.slug) }),
  );

  return {};
};

export default Category;
