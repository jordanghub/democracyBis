export const dfhjqsdkjfh = 'dshfjklshdfksh';

import { memo, useCallback, useEffect } from 'react';

import { Container, ThreadHomepage, Loader } from 'components';
import { NextPage, NextPageContext } from 'next';
import { Store } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { TState } from 'types/state';
import { Typography } from '@material-ui/core';
import { BaseLayout } from 'containers';
import { fetchThreadsByCategory, changeCategoryThreads } from 'store/actions';
import { useRouter } from 'next/router';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll';
import { usePagination, usePrevious } from 'hooks';

const Category: NextPage = memo(() => {
  const router = useRouter();
  const dispatch = useDispatch();

  const id = router.query.slug;

  const previousId = usePrevious(id);

  const threads = useSelector((state: TState) => state.thread.categoryThreads);

  const scoringCategories = useSelector(
    (state: TState) => state.votes.scoringCategories,
  );

  const categories = useSelector((state: TState) => state.thread.categories);

  const category = categories.find(
    (cat) => cat.id === Number(router.query.slug),
  );

  const fethLatestThreadsAction = useCallback(
    (payload) => dispatch(fetchThreadsByCategory(payload)),
    [dispatch],
  );

  const handleCategoryPageChange = ({ page }) => {
    fethLatestThreadsAction({
      page,
      categoryId: router.query.slug,
    });
  };

  const { isLoading, handlePageChange, paginationData } = usePagination(
    'category-threads',
    handleCategoryPageChange,
  );

  if (typeof window !== 'undefined') {
    useInfiniteScroll(null, handlePageChange, true);
  }

  useEffect(() => {
    if (previousId && previousId !== id) {
      fethLatestThreadsAction({ page: 1, categoryId: Number(id) });
    }

    return () => {
      dispatch(
        changeCategoryThreads({
          threads: null,
        }),
      );
    };
  }, [id]);

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

  return (
    <BaseLayout>
      <Container>
        {threadList && threadList.length === 0 && (
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
          </>
        )}
      </Container>
      {(isLoading || !threadList) && <Loader />}
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
