import { Container } from 'components';
import { BaseLayout, Thread } from 'containers';
import { NextPage, NextPageContext } from 'next';
import { Store } from 'redux';
import { fetchThreadSingle, clearThreadSingle } from 'store/actions';
import { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchAndAwait } from 'utils/reduxFetchAndAwait';
import { FETCH_THREAD_SINGLE_ERROR } from 'appConstant/loadingErrors';
import { useThread } from 'hooks';

const ThreadShowPage: NextPage = ({ statusCode }: any) => {
  const router = useRouter();

  const { clearThreadSingle } = useThread();

  useEffect(() => {
    return () => {
      clearThreadSingle();
    };
  }, []);

  return (
    <BaseLayout statusCode={statusCode}>
      <Container>
        <Thread slug={router.query.slug as string} />
      </Container>
    </BaseLayout>
  );
};

ThreadShowPage.getInitialProps = async ({
  store,
  query,
  res,
}: NextPageContext & { store: Store }) => {
  store.dispatch(clearThreadSingle());

  const result: any = await fetchAndAwait({
    action: fetchThreadSingle,
    actionPayload: {
      id: query.slug,
    },
    dataSelector: (state) => state.thread.threadSingle,
    errorSelector: (state) =>
      state.app.loadingErrors[FETCH_THREAD_SINGLE_ERROR],
    store,
  });

  if (result.code) {
    if (typeof window === 'undefined') {
      res.statusCode = result.code;
    }
  }

  return {
    statusCode: result?.code,
  };
};

export default ThreadShowPage;
