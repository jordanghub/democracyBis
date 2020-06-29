import {
  LOGOUT,
  LOGIN_SUCCESS,
  SET_AUTH_STATUS,
  SET_REFRESH_STATUS,
  GET_NEW_TOKEN_WITH_REFRESH,
  FETCH_USER_DATA,
  CHANGE_USER_DATA,
  CHANGE_USER_TOKEN,
  REFRESH_NOTIFICATION_WEBSOCKET,
  RESEND_CONFIRMATION_EMAIL,
  SET_USER_LOGIN_DETAILS,
  SET_USER_TOKEN,
} from 'store/actionTypes';

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
}

export interface SetAuthStatusAction {
  type: typeof SET_AUTH_STATUS;
  payload: SetAuthStatusPayload;
}

export type SetAuthStatusPayload = {
  status: boolean;
};

export interface ISetRefreshStatusAction {
  type: typeof SET_REFRESH_STATUS;
  payload: ISetRefreshStatusPayload;
}
export type ISetRefreshStatusPayload = {
  status: boolean;
};
export interface IGetNewTokenWithRefresh {
  type: typeof GET_NEW_TOKEN_WITH_REFRESH;
}

export interface IFetchUserDataAction {
  type: typeof FETCH_USER_DATA;
}

export interface IChangeUserDataAction {
  type: typeof CHANGE_USER_DATA;
  payload: IChangeUserDataPayload;
}

export interface IChangeUserDataPayload {}

export interface IResendConfirmationEmailAction {
  type: typeof RESEND_CONFIRMATION_EMAIL;
}

export interface ISetUserLoginDetailsAction {
  type: typeof SET_USER_LOGIN_DETAILS;
  payload: ISetUserLoginDetailsPayload;
}
export interface ISetUserLoginDetailsPayload {
  username: string;
  password: string;
}
export interface ISetUserTokenPayload {
  token: string;
}

export interface ISetUserTokenAction {
  type: typeof SET_USER_TOKEN;
  payload: ISetUserTokenPayload;
}

export interface IResendConfirmationEmailFromTokenAction {
  type: typeof RESEND_CONFIRMATION_EMAIL_FROM_TOKEN;
  payload: IResendConfirmationEmailFromTokenPayload;
}
export interface IResendConfirmationEmailFromTokenPayload {
  token: string;
}

export interface IValidateEmailAction {
  type: typeof VALIDATE_EMAIL;
  payload: IResendConfirmationEmailFromTokenPayload;
}
export interface IValidateEmailPayload {
  token: string;
}
