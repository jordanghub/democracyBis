import { NextPage, NextPageContext } from 'next';
import { Store } from 'redux';

import { BaseLayout } from 'containers/Layouts';
import Router from 'next/router';
import { logoutActions } from 'utils/logout';

const Logout: NextPage = () => {
  return <BaseLayout>...</BaseLayout>;
};

Logout.getInitialProps = async (
  ctx: NextPageContext & { store: Store; isServer: boolean },
) => {
  if (typeof window === 'undefined') {
    logoutActions(ctx.res);
    ctx.res.writeHead(302, { Location: '/' });
    return ctx.res.end();
  } else {
    Router.push('/');
  }
};

export default Logout;
