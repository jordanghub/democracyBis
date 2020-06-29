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
  CHANGE_CATEGORY_THREADS,
  SEARCH_THREAD,
  CHANGE_SEARCH_THREAD_RESULT,
  TOGGLE_THREAD_LOCK,
} from 'store/actionTypes';

import {
  FetchLatestThreadsActionType,
  IChangeLatestThreadsAction,
  IChangeLatestThreadsPayload,
  FetchCategoriesAction,
  ChangeCategoriesAction,
  FetchThreadSingleAction,
  FetchThreadSinglePayload,
  SetThreadSingleAction,
  SetThreadSinglePayload,
  AddNewThreadMessageAction,
  ClearThreadSingleAction,
  FetchLatestThreadsPayload,
  IFetchThreadsByCategoryPayload,
  IFetchThreadsByCategoryAction,
  IChangeCategoryThreadsPayload,
  IChangeCategoryThreadsAction,
  ISearchThreadPayload,
  ISearchThreadAction,
  IChangeThreadSearchResultPayload,
  IChangeThreadSearchResultAction,
  IToggleThreadLockPayload,
  IToggleThreadLockAction,
} from './interface';

export const fetchLatestThreads = (
  payload: FetchLatestThreadsPayload,
): FetchLatestThreadsActionType => ({
  type: FETCH_LATEST_THREADS,
  payload,
});

export const changeLatestThreads = (
  payload: IChangeLatestThreadsPayload,
): IChangeLatestThreadsAction => ({
  type: CHANGE_LATEST_THREADS,
  payload,
});

export const fetchThreadsByCategory = (
  payload: IFetchThreadsByCategoryPayload,
): IFetchThreadsByCategoryAction => ({
  type: FETCH_THREADS_BY_CATEGORY,
  payload,
});

export const changeCategoryThreads = (
  payload: IChangeCategoryThreadsPayload,
): IChangeCategoryThreadsAction => ({
  type: CHANGE_CATEGORY_THREADS,
  payload,
});

export const fetchCategories = (): FetchCategoriesAction => ({
  type: FETCH_CATEGORIES,
});

export const changeCategories = (payload): ChangeCategoriesAction => ({
  type: CHANGE_CATEGORIES,
  payload,
});

export const fetchThreadSingle = (
  payload: FetchThreadSinglePayload,
): FetchThreadSingleAction => ({
  type: FETCH_THREAD_SINGLE,
  payload,
});
export const setThreadSingle = (
  payload: SetThreadSinglePayload,
): SetThreadSingleAction => ({
  type: SET_THREAD_SINGLE,
  payload,
});

export const addNewThreadMessage = (payload): AddNewThreadMessageAction => ({
  type: ADD_NEW_THREAD_MESSAGE,
  payload,
});

export const clearThreadSingle = (): ClearThreadSingleAction => ({
  type: CLEAR_THREAD_SINGLE,
});

export const searchThread = (
  payload: ISearchThreadPayload,
): ISearchThreadAction => ({
  type: SEARCH_THREAD,
  payload,
});

export const changeSearchThreadResult = (
  payload: IChangeThreadSearchResultPayload,
): IChangeThreadSearchResultAction => ({
  type: CHANGE_SEARCH_THREAD_RESULT,
  payload,
});

export const toggleThreadLock = (
  payload: IToggleThreadLockPayload,
): IToggleThreadLockAction => ({
  type: TOGGLE_THREAD_LOCK,
  payload,
});
