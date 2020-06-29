// @ts-nocheck
jest.mock('utils/Axios');
jest.mock('next/router');

Router;
import SagaTester from 'redux-saga-tester';
import { getAxios } from 'utils/Axios';
import {
  threadReducer,
  initialThreadState,
  initialPaginationState,
  paginationReducer,
  initialFormsState,
  formsReducer,
} from 'store/reducers';
import {
  fetchSearchThread,
  fetchThreadByCategory,
  fetchLatestThreads,
  fetchCategories,
  fetchThreadSingle,
  createThreadAnswer,
  threadCreateFormSubmit,
} from '../index';
import {
  searchThread,
  fetchThreadsByCategory as fetchThreadsByCategoryAction,
  fetchLatestThreads as fetchLatestThreadsAction,
  fetchCategories as fetchCategoriesAction,
  fetchThreadSingle as fetchThreadSingleAction,
  createThreadAnswerFormSubmit,
  createThreadFormSubmit,
} from 'store/actions';
import {
  SEARCH_THREAD,
  CHANGE_SEARCH_THREAD_RESULT,
  FETCH_THREADS_BY_CATEGORY,
  CHANGE_CATEGORY_THREADS,
  FETCH_LATEST_THREADS,
  CHANGE_LATEST_THREADS,
  FETCH_CATEGORIES,
  CHANGE_CATEGORIES,
  FETCH_THREAD_SINGLE,
  SET_THREAD_SINGLE,
  FORM_SUBMIT_SUCCESS,
  CREATE_THREAD_ANSWER_FORM_SUBMIT,
  CREATE_THREAD_FORM_SUBMIT,
  SET_FORM_ERROR,
} from 'store/actionTypes';
import Router from 'next/router';

beforeEach(() => {
  getAxios.mockClear();
  Router.push.mockClear();
});

describe('fetchSearchThread', () => {
  test('', async (done) => {
    const sagaTester = new SagaTester({
      initialState: {
        thread: { ...initialThreadState },
      },
      reducers: {
        thread: threadReducer,
      },
    });

    const payload = {
      search: 'something to search',
    };

    const data = [
      {
        id: 1,
        title: 'something',
      },
    ];

    const response = {
      data: {
        items: data,
      },
    };

    const expectedState = {
      thread: {
        ...initialThreadState,
        searchResults: data,
      },
    };

    getAxios.mockImplementation(() => ({
      get: jest.fn(() => Promise.resolve(response)),
    }));

    sagaTester.start(fetchSearchThread, {
      type: SEARCH_THREAD,
      payload,
    });

    sagaTester.dispatch(searchThread(payload));

    await sagaTester.waitFor(CHANGE_SEARCH_THREAD_RESULT);

    expect(sagaTester.getState()).toStrictEqual(expectedState);

    done();
  });
});
describe('fetchThreadByCategory', () => {
  test('', async (done) => {
    const sagaTester = new SagaTester({
      initialState: {
        thread: { ...initialThreadState },
        pagination: { ...initialPaginationState },
      },
      reducers: {
        thread: threadReducer,
        pagination: paginationReducer,
      },
    });

    const payload = {
      categoryId: 1,
      page: 5,
    };

    const data = [
      {
        id: 1,
        title: 'something',
      },
    ];

    const response = {
      data: {
        items: data,
        count: 50,
        pages: 10,
        currentPage: 5,
      },
    };

    const expectedState = {
      thread: {
        ...initialThreadState,
        categoryThreads: data,
      },
      pagination: {
        ...initialPaginationState,
        'category-threads': {
          count: response.data.count,
          pages: response.data.pages,
          currentPage: response.data.currentPage,
        },
      },
    };

    getAxios.mockImplementation(() => ({
      get: jest.fn(() => Promise.resolve(response)),
    }));

    sagaTester.start(fetchThreadByCategory, {
      type: FETCH_THREADS_BY_CATEGORY,
      payload,
    });

    sagaTester.dispatch(fetchThreadsByCategoryAction(payload));

    await sagaTester.waitFor(CHANGE_CATEGORY_THREADS);

    expect(sagaTester.getState()).toStrictEqual(expectedState);

    done();
  });
});
describe('fetchLatestThreads', () => {
  test('', async (done) => {
    const sagaTester = new SagaTester({
      initialState: {
        thread: { ...initialThreadState },
        pagination: { ...initialPaginationState },
      },
      reducers: {
        thread: threadReducer,
        pagination: paginationReducer,
      },
    });

    const payload = {
      page: 2,
    };

    const data = [
      {
        id: 1,
        title: 'something',
      },
    ];

    const response = {
      data: {
        items: data,
        count: 10,
        pages: 2,
        currentPage: 2,
      },
    };

    const expectedState = {
      thread: {
        ...initialThreadState,
        latestThreads: data,
      },
      pagination: {
        ...initialPaginationState,
        latestThreads: {
          count: response.data.count,
          pages: response.data.pages,
          currentPage: response.data.currentPage,
        },
      },
    };

    getAxios.mockImplementation(() => ({
      get: jest.fn(() => Promise.resolve(response)),
    }));

    sagaTester.start(fetchLatestThreads, {
      type: FETCH_LATEST_THREADS,
      payload,
    });

    sagaTester.dispatch(fetchLatestThreadsAction(payload));

    await sagaTester.waitFor(CHANGE_LATEST_THREADS);

    expect(sagaTester.getState()).toStrictEqual(expectedState);

    done();
  });
});

describe('fetchCategories', () => {
  test('', async (done) => {
    const sagaTester = new SagaTester({
      initialState: {
        thread: { ...initialThreadState },
      },
      reducers: {
        thread: threadReducer,
      },
    });

    const data = [
      {
        id: 1,
        name: 'some category name',
      },
      {
        id: 2,
        name: 'some other category name',
      },
    ];

    const expectedState = {
      thread: {
        ...initialThreadState,
        categories: data,
      },
    };

    const response = {
      data,
    };

    getAxios.mockImplementation(() => ({
      get: jest.fn(() => Promise.resolve(response)),
    }));

    sagaTester.start(fetchCategories, {
      type: FETCH_CATEGORIES,
    });

    sagaTester.dispatch(fetchCategoriesAction());

    await sagaTester.waitFor(CHANGE_CATEGORIES);

    expect(sagaTester.getState()).toStrictEqual(expectedState);

    done();
  });
});

describe('fetchThreadSingle', () => {
  test('', async (done) => {
    const sagaTester = new SagaTester({
      initialState: {
        thread: { ...initialThreadState },
      },
      reducers: {
        thread: threadReducer,
      },
    });

    const data = {
      title: 'some title',
      messages: [],
      sources: [],
      author: {
        id: 1,
        username: 'test',
      },
    };

    const expectedState = {
      thread: {
        ...initialThreadState,
        threadSingle: data,
      },
    };

    const response = {
      data,
    };

    const payload = {
      id: 1,
    };

    getAxios.mockImplementation(() => ({
      get: jest.fn(() => Promise.resolve(response)),
    }));

    sagaTester.start(fetchThreadSingle, {
      type: FETCH_THREAD_SINGLE,
      payload,
    });

    sagaTester.dispatch(fetchThreadSingleAction());

    await sagaTester.waitFor(SET_THREAD_SINGLE);

    expect(sagaTester.getState()).toStrictEqual(expectedState);

    done();
  });
});

describe('createThreadAnswer', () => {
  test('', async (done) => {
    const sagaTester = new SagaTester({
      initialState: {
        thread: {
          ...initialThreadState,
          threadSingle: {
            id: 2,
          },
        },
        forms: { ...initialFormsState },
      },
      reducers: {
        thread: threadReducer,
        forms: formsReducer,
      },
    });

    const data = {
      title: 'some title',
      content: 'some content',
      sources: [],
    };

    const expectedState = {
      thread: {
        ...initialThreadState,
        threadSingle: {
          id: 2,
        },
      },
      forms: {
        forms: {
          'thread-answer': {
            errors: null,
            initialData: null,
            submitSuccess: true,
          },
        },
      },
    };

    const response = {
      status: 201,
    };

    getAxios.mockImplementation(() => ({
      post: jest.fn(() => Promise.resolve(response)),
    }));

    sagaTester.start(createThreadAnswer, {
      type: CREATE_THREAD_ANSWER_FORM_SUBMIT,
      payload: data,
    });

    sagaTester.dispatch(createThreadAnswerFormSubmit(data));

    await sagaTester.waitFor(FORM_SUBMIT_SUCCESS);

    expect(sagaTester.getState()).toStrictEqual(expectedState);

    done();
  });
});

describe('threadCreateFormSubmit', () => {
  test('submit success', async (done) => {
    const sagaTester = new SagaTester({
      initialState: {
        thread: {
          ...initialThreadState,
        },
      },
      reducers: {
        thread: threadReducer,
      },
    });

    const data = {
      title: 'some title',
      message: 'some content',
      categories: [1, 2, 3],
      sources: [],
      selectedText: 'some selected text',
      refThreadId: 2,
      refMessageId: 5,
    };

    const response = {
      status: 201,
      data,
    };

    Router.push.mockImplementation(() => jest.fn(() => {}));

    getAxios.mockImplementation(() => ({
      post: jest.fn(() => Promise.resolve(response)),
    }));

    const saga = sagaTester.start(threadCreateFormSubmit, {
      type: CREATE_THREAD_FORM_SUBMIT,
      payload: data,
    });

    sagaTester.dispatch(createThreadFormSubmit(data));

    await saga.done;

    expect(Router.push).toHaveBeenCalledTimes(1);
    done();
  });
  test('submit failed', async (done) => {
    const sagaTester = new SagaTester({
      initialState: {
        thread: {
          ...initialThreadState,
        },
        forms: {
          ...initialFormsState,
        },
      },
      reducers: {
        thread: threadReducer,
        forms: formsReducer,
      },
    });

    const errors = {
      title: {
        property: 'title',
        constraints: ['some', 'constraints', 'keys'],
      },
    };

    const expectedState = {
      thread: {
        ...initialThreadState,
      },
      forms: {
        forms: {
          'thread-create': {
            errors,
            submitSuccess: false,
          },
        },
      },
    };

    const data = {
      title: 'some title',
      message: 'some content',
      categories: [1, 2, 3],
      sources: [],
      selectedText: 'some selected text',
      refThreadId: 2,
      refMessageId: 5,
    };

    const err = {
      response: {
        status: 400,
        data: {
          message: { ...errors },
        },
      },
    };

    Router.push.mockImplementation(() => jest.fn(() => {}));

    getAxios.mockImplementation(() => ({
      post: jest.fn(() => Promise.reject(err)),
    }));

    const saga = sagaTester.start(threadCreateFormSubmit, {
      type: CREATE_THREAD_FORM_SUBMIT,
      payload: data,
    });

    sagaTester.dispatch(createThreadFormSubmit(data));
    await sagaTester.waitFor(SET_FORM_ERROR);
    expect(Router.push).toHaveBeenCalledTimes(0);

    done();
  });
});
