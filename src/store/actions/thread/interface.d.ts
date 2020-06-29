import {
  FETCH_LATEST_THREADS,
  CHANGE_LATEST_THREADS,
  FETCH_CATEGORIES,
  CHANGE_CATEGORIES,
  FETCH_THREAD_SINGLE,
  SET_THREAD_SINGLE,
  ADD_NEW_THREAD_MESSAGE,
  CLEAR_THREAD_SINGLE,
  FETCH_THREADS_BY_CATEGORY,
  SEARCH_THREAD,
  CHANGE_SEARCH_THREAD_RESULT,
  TOGGLE_THREAD_LOCK,
} from 'store/actionTypes';

import { ThreadHomepage } from 'types/thread';

export interface FetchLatestThreadsActionType {
  type: typeof FETCH_LATEST_THREADS;
  payload: FetchLatestThreadsPayload;
}

export type FetchLatestThreadsPayload = {
  page: number;
};

export interface IChangeLatestThreadsAction {
  type: typeof CHANGE_LATEST_THREADS;
  payload: IChangeLatestThreadsPayload;
}

export interface IChangeLatestThreadsPayload {
  threads: ThreadHomepage[];
}

export interface IFetchThreadsByCategoryAction {
  type: typeof FETCH_THREADS_BY_CATEGORY;
  payload: FetchLatestThreadsPayload;
}

export type IFetchThreadsByCategoryPayload = {
  page: number;
  categoryId: number;
};

export interface IChangeCategoryThreadsAction {
  type: typeof CHANGE_CATEGORY_THREADS;
  payload: IChangeCategoryThreadsPayload;
}

export interface IChangeCategoryThreadsPayload {
  threads: ThreadHomepage[];
}

export interface FetchCategoriesAction {
  type: typeof FETCH_CATEGORIES;
}
export interface ChangeCategoriesAction {
  type: typeof CHANGE_CATEGORIES;
  payload: CategoryType[];
}

export interface FetchThreadSingleAction {
  type: typeof FETCH_THREAD_SINGLE;
  payload: FetchThreadSinglePayload;
}
export type FetchThreadSinglePayload = {
  id: number;
};

export interface SetThreadSingleAction {
  type: typeof SET_THREAD_SINGLE;
  payload: SetThreadSinglePayload;
}
export type SetThreadSinglePayload = any;

export interface AddNewThreadMessageAction {
  type: typeof ADD_NEW_THREAD_MESSAGE;
  payload: any;
}

export interface ClearThreadSingleAction {
  type: typeof CLEAR_THREAD_SINGLE;
}

export interface ISearchThreadAction {
  type: typeof SEARCH_THREAD;
  payload: ISearchThreadPayload;
}

export interface ISearchThreadPayload {
  search: string;
  full?: boolean;
  page: number;
}

export interface IChangeThreadSearchResultAction {
  type: typeof CHANGE_SEARCH_THREAD_RESULT;
  payload: IChangeThreadSearchResultPayload;
}

export interface IChangeThreadSearchResultPayload {
  searchResult: any;
}

export interface IToggleThreadLockAction {
  type: typeof TOGGLE_THREAD_LOCK;
  payload: IToggleThreadLockPayload;
}
export interface IToggleThreadLockPayload {
  reason?: string;
}
