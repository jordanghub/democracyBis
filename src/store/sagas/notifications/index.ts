import { getAxios } from 'utils/Axios';

import { takeLatest, put, select, debounce, call } from 'redux-saga/effects';

import {
  FETCH_NOTIFICATIONS,
  GET_ACTIVE_NOTIFICATION_COUNT,
} from 'store/actionTypes';

import { NOTIFICATIONS_ENDPOINT, BASE_API_URL } from 'appConstant/apiEndpoint';
import { AxiosResponse } from 'axios';
import {
  setNotifications,
  setNotificationCount,
} from 'store/actions/notifications';
import { TState } from 'types/state';
import { setPaginationData } from 'store/actions';

function* fetchNotifications({ type, payload }) {
  const axios = getAxios();

  const notificationsCount = yield select(
    (state: TState) => state.notifications.count,
  );

  const notifications = yield select(
    (state: TState) => state.notifications.items,
  );

  const page = payload?.page || 1;

  try {
    const response: AxiosResponse = yield axios.get(
      `${BASE_API_URL}${NOTIFICATIONS_ENDPOINT}?page=${page}`,
    );

    const items = [...(notifications || []), ...response.data.items];

    if (notificationsCount > 0) {
      yield call(putNotificationsAsViewed);
    }

    yield put(
      setPaginationData({
        resource: 'notifications',
        count: response.data.count,
        pages: response.data.pages,
        currentPage: response.data.currentPage,
      }),
    );

    yield put(setNotifications(items));
  } catch (err) {}
}

function* getActiveNotifiationCount() {
  const axios = getAxios();

  try {
    const response: AxiosResponse = yield axios.get(
      `${BASE_API_URL}${NOTIFICATIONS_ENDPOINT}?count=true`,
    );

    yield put(
      setNotificationCount({
        count: response.data.activeNotifications,
      }),
    );
  } catch (err) {}
}

function* putNotificationsAsViewed() {
  const axios = getAxios();
  try {
    yield axios.put(`${BASE_API_URL}${NOTIFICATIONS_ENDPOINT}`);

    yield put(
      setNotificationCount({
        count: 0,
      }),
    );
  } catch (err) {}
}

export const notificationsSaga = [
  debounce(500, FETCH_NOTIFICATIONS, fetchNotifications),
  takeLatest(GET_ACTIVE_NOTIFICATION_COUNT, getActiveNotifiationCount),
];
