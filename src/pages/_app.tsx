import React from 'react';

import { GlobalStyle } from 'theme';
import { Provider } from 'react-redux';
import cookies from 'cookie';

import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import createStore from 'store';
import {
  setAuthStatus,
  fetchScoringCategories,
  fetchCategories,
  fetchUserData,
  setUserToken,
} from 'store/actions';
import { AppContainer } from 'containers';

const AppComponent = ({ Component, pageProps, store }) => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </Provider>
  );
};

AppComponent.getInitialProps = async ({ Component, ctx }) => {
  if (typeof window === 'undefined') {
    ctx.store.dispatch(fetchScoringCategories());
    ctx.store.dispatch(fetchCategories());
    ctx.store.dispatch(fetchUserData());
  }

  if (typeof window === 'undefined') {
    if (typeof ctx.req.headers.cookie === 'string') {
      const cookiesList = cookies.parse(ctx.req.headers.cookie);
      if (cookiesList && cookiesList.token) {
        ctx.store.dispatch(setAuthStatus({ status: true }));
        ctx.store.dispatch(setUserToken({ token: cookiesList.token }));
      } else {
        ctx.store.dispatch(setAuthStatus({ status: false }));
      }
    } else {
      ctx.store.dispatch(setAuthStatus({ status: false }));
    }
  }

  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default withRedux(createStore)(withReduxSaga(AppComponent));
