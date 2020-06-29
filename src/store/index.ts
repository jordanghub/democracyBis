import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  appReducer,
  formsReducer,
  threadReducer,
  userReducer,
  votesReducer,
  paginationReducer,
  notificationsReducer,
} from 'store/reducers';
import { start } from 'store/sagas';
import { axiosInterceptors } from 'utils/Axios';

function configureStore(
  initialState = {},
  { isServer, req = null, res = null },
) {
  const isProd = process.env.NODE_ENV === 'production';

  const sagaMiddleware = createSagaMiddleware();

  let enhancers = null;

  if (isProd) {
    enhancers = compose(applyMiddleware(sagaMiddleware));
  } else {
    enhancers = composeWithDevTools(applyMiddleware(sagaMiddleware));
  }

  const reducers = combineReducers({
    app: appReducer,
    forms: formsReducer,
    thread: threadReducer,
    user: userReducer,
    votes: votesReducer,
    pagination: paginationReducer,
    notifications: notificationsReducer,
  });

  const store = createStore(reducers, initialState, enhancers);

  axiosInterceptors(store, res, req);

  /**
   * next-redux-saga depends on `sagaTask` being attached to the store during `getInitialProps`.
   * It is used to await the rootSaga task before sending results to the client.
   * However, next-redux-wrapper creates two server-side stores per request:
   * One before `getInitialProps` and one before SSR (see issue #62 for details).
   * On the server side, we run rootSaga during `getInitialProps` only:
   */
  if (req || !isServer) {
    // Ignore error because of the next saga package
    // @ts-ignore
    store.sagaTask = sagaMiddleware.run(start);
  }

  return store;
}

export default configureStore;
