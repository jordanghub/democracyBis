import {
  RouteChangeCompleteAction,
  SetFlashMessageAction,
  RouteChangeStartAction,
  ChangeIsPageLoadingAction,
  IResetFlashMessageAction,
  IAddLoadingErrorAction,
} from 'store/actions/app/interface';

export type AppReducerActionTypes =
  | RouteChangeStartAction
  | RouteChangeCompleteAction
  | SetFlashMessageAction
  | ChangeIsPageLoadingAction
  | IResetFlashMessageAction
  | IAddLoadingErrorAction;
