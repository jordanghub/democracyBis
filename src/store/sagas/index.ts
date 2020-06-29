import { all, takeLatest, put } from 'redux-saga/effects';

import { threadSaga } from './thread';
import { votesSagas } from './votes';
import { userSagas } from './user';

import { toggleDarkMode } from 'store/actions';
import { CHECK_STORAGE_VALUES } from 'store/actionTypes';

export function* initStorageValues() {
  const isDarkMode = localStorage.getItem('darkMode') || false;

  yield put(
    toggleDarkMode({
      status: isDarkMode === 'true' ? true : false,
    }),
  );
}
export function* start() {
  yield all([...threadSaga, ...votesSagas, ...userSagas]);

  if (typeof window !== 'undefined') {
    yield takeLatest(CHECK_STORAGE_VALUES, initStorageValues);
  }
}
