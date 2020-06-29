import Router from 'next/router';
import { AxiosResponse } from 'axios';

import { getAxios } from 'utils/Axios';
import { select, put, takeLatest, debounce, delay } from 'redux-saga/effects';
import {
  BASE_API_URL,
  THREAD_LIST_ROUTE,
  CATEGORIES_ENDPOINT,
  SEARCH_THREAD_ENDPOINT,
} from 'appConstant/apiEndpoint';
import { TState } from 'types/state';

import {
  setThreadSingle,
  changeCategories,
  changeLatestThreads,
  setFormError,
  formSubmitSuccess,
  setPaginationData,
  changeCategoryThreads,
  changeSearchThreadResult,
  addLoadingError,
  setFlashMessage,
} from 'store/actions';

import {
  FETCH_LATEST_THREADS,
  FETCH_CATEGORIES,
  FETCH_THREAD_SINGLE,
  CREATE_THREAD_ANSWER_FORM_SUBMIT,
  CREATE_THREAD_FORM_SUBMIT,
  FETCH_THREADS_BY_CATEGORY,
  SEARCH_THREAD,
  TOGGLE_THREAD_LOCK,
} from 'store/actionTypes';
import { FETCH_THREAD_SINGLE_ERROR } from 'appConstant/loadingErrors';

export function* fetchSearchThread({ type, payload }) {
  const axios = getAxios();

  const params: any = {
    search: payload.search,
    page: payload.page || 1,
  };

  if (payload.full) {
    params.full = '1';
  }

  try {
    const response: AxiosResponse = yield axios.get(
      `${BASE_API_URL}${SEARCH_THREAD_ENDPOINT}`,
      {
        params,
      },
    );

    yield put(
      setPaginationData({
        resource: 'search-result',
        count: response.data.count,
        pages: response.data.pages,
        currentPage: response.data.currentPage,
      }),
    );

    yield put(
      changeSearchThreadResult({
        searchResult: response.data.items,
      }),
    );
  } catch (err) {}
}

export function* fetchThreadByCategory({ type, payload }) {
  const axios = getAxios();

  try {
    const response = yield axios.get(
      `${BASE_API_URL}${CATEGORIES_ENDPOINT}/${payload.categoryId}/threads`,
      {
        params: {
          page: payload.page || 1,
        },
      },
    );
    const { data } = response;

    yield put(
      changeCategoryThreads({
        threads: data.items,
      }),
    );
    yield put(
      setPaginationData({
        resource: 'category-threads',
        count: data.count,
        pages: data.pages,
        currentPage: data.currentPage,
      }),
    );
  } catch (err) {}
}

export function* fetchLatestThreads({ type, payload }) {
  if (payload.page && payload.page > 1) {
    yield delay(500);
  }
  const axios = getAxios();

  const latestThreads = yield select(
    (state: TState) => state.thread.latestThreads,
  );

  try {
    const response = yield axios.get(`${BASE_API_URL}${THREAD_LIST_ROUTE}`, {
      params: {
        page: payload.page || 1,
      },
    });
    const { data } = response;

    yield put(
      changeLatestThreads({
        threads: latestThreads ? [...latestThreads, ...data.items] : data.items,
      }),
    );
    yield put(
      setPaginationData({
        resource: 'latestThreads',
        count: data.count,
        pages: data.pages,
        currentPage: data.currentPage,
      }),
    );
  } catch (err) {}
}

export function* threadCreateFormSubmit({ type, payload }) {
  const axios = getAxios();

  try {
    const data: any = {
      title: payload.title,
      message: payload.content,
      categories: payload.categories,
    };

    if (payload.sources) {
      data.sources = payload.sources;
    }
    if (payload.selectedText && payload.refThreadId && payload.refMessageId) {
      data.selectedText = payload.selectedText;
      data.refThreadId = payload.refThreadId;
      data.refMessageId = payload.refMessageId;
    }

    const response: AxiosResponse = yield axios.post(
      `${BASE_API_URL}${THREAD_LIST_ROUTE}`,
      data,
    );

    Router.push('/thread/[slug]', `/thread/${response.data.slug}`, {
      shallow: true,
    });
  } catch (err) {
    const { data, status } = err.response;

    if (status === 400) {
      if (data.message) {
        yield put(
          setFormError({ formName: 'thread-create', errors: data.message }),
        );
      }
    }
  }
}

export function* fetchCategories() {
  const axios = getAxios();

  try {
    const response: AxiosResponse = yield axios.get(
      `${BASE_API_URL}${CATEGORIES_ENDPOINT}`,
    );
    yield put(changeCategories(response.data));
  } catch (err) {}
}

export function* fetchThreadSingle({ type, payload }) {
  const axios = getAxios();

  try {
    const response: AxiosResponse = yield axios.get(
      `${BASE_API_URL}${THREAD_LIST_ROUTE}/${payload.id}`,
    );

    yield put(setThreadSingle(response.data));
  } catch (err) {
    yield put(
      addLoadingError({
        key: FETCH_THREAD_SINGLE_ERROR,
        code: err?.response?.status,
      }),
    );
  }
}

export function* createThreadAnswer({ type, payload }) {
  const axios = getAxios();

  const threadId = yield select(
    (state: TState) => state.thread.threadSingle.id,
  );

  const data: any = {
    content: payload.content,
  };

  if (payload.sources) {
    data.sources = payload.sources;
  }

  try {
    const response = yield axios.post(
      `${BASE_API_URL}${THREAD_LIST_ROUTE}/${threadId}/answer`,
      data,
    );
    if (response.status === 201) {
      yield put(
        formSubmitSuccess({
          formName: 'answer-thread',
        }),
      );
    }
  } catch (err) {}
}

export function* toggleThreadLock({ type, payload }) {
  const axios = getAxios();

  const threadSingle = yield select(
    (state: TState) => state.thread.threadSingle,
  );

  if (!threadSingle) {
    return;
  }

  const data: any = {};

  if (payload.reason) {
    data.reason = payload.reason;
  }

  try {
    const response: AxiosResponse = yield axios.post(
      `${BASE_API_URL}${THREAD_LIST_ROUTE}/${threadSingle.id}/toggle-lock`,
      data,
    );

    yield put(
      setFlashMessage({
        type: 'success',
        message: 'Le thread a bien été modifié',
      }),
    );
  } catch (err) {}
}

export const threadSaga = [
  takeLatest(FETCH_LATEST_THREADS, fetchLatestThreads),
  takeLatest(FETCH_CATEGORIES, fetchCategories),
  takeLatest(FETCH_THREAD_SINGLE, fetchThreadSingle),
  takeLatest(CREATE_THREAD_ANSWER_FORM_SUBMIT, createThreadAnswer),
  takeLatest(CREATE_THREAD_FORM_SUBMIT, threadCreateFormSubmit),
  takeLatest(FETCH_THREADS_BY_CATEGORY, fetchThreadByCategory),
  takeLatest(TOGGLE_THREAD_LOCK, toggleThreadLock),
  debounce(500, SEARCH_THREAD, fetchSearchThread),
];
