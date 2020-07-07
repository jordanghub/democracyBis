import { NextPage, NextPageContext } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'redux';
import {
  Typography,
  CircularProgress,
  Dialog,
  DialogContent,
  Modal,
  Zoom,
  Fade,
  NoSsr,
  Slide,
} from '@material-ui/core';

import { ThreadHomepage as ThreadHomepageType } from 'types/thread';
import { TState } from 'types/state';

import * as Styled from 'pagesStyle/index.style';

import { ThreadHomepage, Container } from 'components';
import { fetchLatestThreads } from 'store/actions';

import { BaseLayout } from 'containers/Layouts';
import { useCallback, useState, useEffect } from 'react';
import { InfiniteScroll, Thread } from 'containers';
import { useThread } from 'hooks';
import styled from 'styled-components';

interface HomepageProps {
  threads?: ThreadHomepageType[];
}

const Homepage: NextPage<HomepageProps> = () => {
  const threads = useSelector((state: TState) => state.thread.latestThreads);

  const { fetchLatestThreads, clearLatestThreads } = useThread();

  const [isLoading, changeIsLoading] = useState(true);

  const scoringCategories = useSelector(
    (state: TState) => state.votes.scoringCategories,
  );

  const paginationData = useSelector(
    (state: TState) => state.pagination['latestThreads'],
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

  useEffect(() => {
    if (isLoading) {
      changeIsLoading(false);
    }
  }, [paginationData]);

  const handlePageChange = useCallback(() => {
    if (isLoading) {
      return;
    }
    if (paginationData.currentPage + 1 <= paginationData.pages) {
      changeIsLoading(true);
      fetchLatestThreads({ page: paginationData.currentPage + 1 });
    }
  }, [paginationData, isLoading]);

  return (
    <BaseLayout>
      <Container>
        <Typography variant="h4" component="h2">
          Les derniers threads
        </Typography>
        {threadList}

        <InfiniteScroll handlePageChange={handlePageChange} />
        {isLoading && (
          <div
            style={{
              textAlign: 'center',
              marginTop: '1rem',
              overflow: 'hidden',
            }}
          >
            <CircularProgress />
          </div>
        )}
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
