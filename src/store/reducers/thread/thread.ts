import {
  CHANGE_LATEST_THREADS,
  CHANGE_CATEGORIES,
  SET_THREAD_SINGLE,
  ADD_NEW_THREAD_MESSAGE,
  CLEAR_THREAD_SINGLE,
  CHANGE_CATEGORY_THREADS,
  CHANGE_SEARCH_THREAD_RESULT,
} from 'store/actionTypes';

import { IThreadState } from 'types/state';
import { ThreadReducerActionTypes } from './interface';

export const initialThreadState: IThreadState = {
  threadSingle: null,
  latestThreads: null,
  categories: null,
};

export function threadReducer(
  state: IThreadState = initialThreadState,
  action: ThreadReducerActionTypes,
): IThreadState {
  switch (action.type) {
    case CHANGE_LATEST_THREADS: {
      return {
        ...state,
        latestThreads: action.payload.threads,
      };
    }

    case CHANGE_CATEGORIES: {
      return {
        ...state,
        categories: action.payload,
      };
    }

    case SET_THREAD_SINGLE: {
      return {
        ...state,
        threadSingle: action.payload,
      };
    }

    case ADD_NEW_THREAD_MESSAGE: {
      return {
        ...state,
        threadSingle: {
          ...state.threadSingle,
          messages: [...state.threadSingle.messages, { ...action.payload }],
        },
      };
    }

    case CLEAR_THREAD_SINGLE: {
      return {
        ...state,
        threadSingle: null,
      };
    }

    case CHANGE_CATEGORY_THREADS: {
      return {
        ...state,
        categoryThreads: action.payload.threads,
      };
    }

    case CHANGE_SEARCH_THREAD_RESULT: {
      return {
        ...state,
        searchResults: action.payload.searchResult,
      };
    }

    default:
      return state;
  }
}
