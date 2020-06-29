import {
  LogoutAction,
  LoginSuccess,
  SetAuthStatusAction,
  ISetRefreshStatusAction,
  IChangeUserDataAction,
  IChangeUSerTokenAction,
  ISetUserLoginDetailsAction,
  ISetUserTokenAction,
} from 'store/actions/user/interface';

export type UserReducerActionTypes =
  | LogoutAction
  | LoginSuccess
  | SetAuthStatusAction
  | ISetRefreshStatusAction
  | IChangeUserDataAction
  | ISetUserLoginDetailsAction
  | ISetUserTokenAction;
