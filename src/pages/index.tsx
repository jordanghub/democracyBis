import { NextPage, NextPageContext } from 'next';
import { useSelector } from 'react-redux';
import { Store } from 'redux';
import { Typography } from '@material-ui/core';

import { ThreadHomepage as ThreadHomepageType } from 'types/thread';
import { TState } from 'types/state';

import * as Styled from 'pagesStyle/index.style';

import { ThreadHomepage, Container, Loader } from 'components';
import { fetchLatestThreads } from 'store/actions';

import { BaseLayout } from 'containers/Layouts';
import { useEffect } from 'react';
import { useThread, usePagination } from 'hooks';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll';

interface HomepageProps {
  threads?: ThreadHomepageType[];
}

const Homepage: NextPage<HomepageProps> = () => {
  const threads = useSelector((state: TState) => state.thread.latestThreads);

  const { fetchLatestThreads, clearLatestThreads } = useThread();

  const scoringCategories = useSelector(
    (state: TState) => state.votes.scoringCategories,
  );

  const threadList = threads?.map((threadItem) => (
    <ThreadHomepage
      slug={threadItem.slug}
      key={threadItem.id}
      id={threadItem.id}
      title={threadItem.title}
      author={threadItem.author}
      date={threadItem.createdAt}
      categories={threadItem.categories}
      votes={threadItem.votes}
      messageType="thread"
      withAvatar
      scoringCategories={scoringCategories}
    />
  ));

  useEffect(() => {
    return () => {
      clearLatestThreads();
    };
  }, []);

  const { isLoading, handlePageChange } = usePagination(
    'latestThreads',
    fetchLatestThreads,
  );

  if (typeof window !== 'undefined') {
    useInfiniteScroll(null, handlePageChange, true);
  }

  return (
    <BaseLayout>
      <Container>
        <Typography variant="h4" component="h2">
          Les derniers threads
        </Typography>
        {threadList}
        {isLoading && <Loader />}
      </Container>
    </BaseLayout>
  );
};

Homepage.getInitialProps = async (
  ctx: NextPageContext & { store: Store; isServer: boolean },
) => {
  const { store } = ctx;

  store.dispatch(fetchLatestThreads({ page: 1 }));
  return {};
};

export default Homepage;
