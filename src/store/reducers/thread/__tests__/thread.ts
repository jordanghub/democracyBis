import { initialThreadState, threadReducer } from '../thread';
import {
  changeLatestThreads,
  changeCategories,
  setThreadSingle,
  addNewThreadMessage,
  clearThreadSingle,
  changeCategoryThreads,
  changeSearchThreadResult,
} from 'store/actions';

describe('threadReducer', () => {
  test('initial state', () => {
    expect(threadReducer(undefined, { type: null, payload: null })).toEqual(
      initialThreadState,
    );
  });
  test('handle CHANGE_LATEST_THREADS', () => {
    const latestThreads = ['something'];
    const payload = {
      threads: latestThreads,
    };
    const expected = {
      ...initialThreadState,
      latestThreads,
    };
    expect(
      // @ts-ignore
      threadReducer(initialThreadState, changeLatestThreads(payload)),
    ).toEqual(expected);
  });

  test('handle CHANGE_CATEGORIES', () => {
    const categories = ['something'];

    const expected = {
      ...initialThreadState,
      categories,
    };
    expect(
      threadReducer(initialThreadState, changeCategories(categories)),
    ).toEqual(expected);
  });

  test('handle SET_THREAD_SINGLE', () => {
    const threadSingle = {
      title: 'a title',
      messages: [],
    };

    const expected = {
      ...initialThreadState,
      threadSingle,
    };
    expect(
      threadReducer(initialThreadState, setThreadSingle(threadSingle)),
    ).toEqual(expected);
  });
  test('handle ADD_NEW_THREAD_MESSAGE', () => {
    const threadSingle = {
      title: 'a title',
      messages: [],
    };

    const messageData = {
      content: 'some content',
      author: {
        id: 1,
        username: 'something',
      },
    };

    const expected = {
      ...initialThreadState,
      threadSingle: {
        ...threadSingle,
        messages: [messageData],
      },
    };

    const state = threadReducer(
      initialThreadState,
      setThreadSingle(threadSingle),
    );

    expect(threadReducer(state, addNewThreadMessage(messageData))).toEqual(
      expected,
    );
  });
  test('handle CLEAR_THREAD_SINGLE', () => {
    const threadSingle = {
      title: 'a title',
      messages: [],
    };

    const initialState = {
      ...initialThreadState,
      threadSingle,
    };

    const expected = {
      ...initialThreadState,
      threadSingle: null,
    };

    expect(threadReducer(initialState, clearThreadSingle())).toEqual(expected);
  });

  test('handle CHANGE_CATEGORY_THREADS', () => {
    const threads = ['something', 'somethingElse'];
    const payload = {
      threads,
    };
    const expected = {
      ...initialThreadState,
      categoryThreads: threads,
    };

    expect(
      // @ts-ignore
      threadReducer(initialThreadState, changeCategoryThreads(payload)),
    ).toEqual(expected);
  });
  test('handle CHANGE_CATEGORY_THREADS', () => {
    const searchResult = ['something', 'somethingElse'];

    const payload = {
      searchResult,
    };
    const expected = {
      ...initialThreadState,
      searchResults: searchResult,
    };

    expect(
      threadReducer(initialThreadState, changeSearchThreadResult(payload)),
    ).toEqual(expected);
  });
});
