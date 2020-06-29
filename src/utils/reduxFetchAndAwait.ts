import { Store } from 'redux';
import { TState } from 'types/state';

interface IFetchAndAwait {
  store: Store;
  action: any;
  actionPayload: any;
  dataSelector: (state: TState) => any;
  errorSelector: (state: TState) => any;
  timeout?: number;
}

export const fetchAndAwait = ({
  store,
  action,
  actionPayload,
  dataSelector,
  errorSelector,
  timeout = 2000,
}: IFetchAndAwait) => {
  return new Promise((resolve) => {
    store.dispatch(action(actionPayload));

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();

      const timeoutRequest = setTimeout(() => {
        resolve(false);
      }, timeout);

      if (dataSelector(state) || errorSelector(state)) {
        clearTimeout(timeoutRequest);
        unsubscribe();
        if (dataSelector(state)) {
          return resolve(dataSelector(state));
        }
        if (errorSelector(state)) {
          return resolve(errorSelector(state));
        }
      }
    });
  });
};
