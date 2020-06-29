import {
  ChangeLatestThreadsActionType,
  ChangeCategoriesAction,
  SetThreadSingleAction,
  AddNewThreadMessageAction,
  ClearThreadSingleAction,
  IChangeCategoryThreadsAction,
  IChangeThreadSearchResultAction,
} from 'store/actions/thread/interface';

export type ThreadReducerActionTypes =
  | ClearThreadSingleAction
  | ChangeLatestThreadsActionType
  | ChangeCategoriesAction
  | SetThreadSingleAction
  | AddNewThreadMessageAction
  | IChangeCategoryThreadsAction
  | IChangeThreadSearchResultAction;
