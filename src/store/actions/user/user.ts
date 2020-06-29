import {
  LogoutAction,
  LoginSuccess,
  SetAuthStatusAction,
  SetAuthStatusPayload,
  ISetRefreshStatusAction,
  ISetRefreshStatusPayload,
  IGetNewTokenWithRefresh,
  IFetchUserDataAction,
  IChangeUserDataPayload,
  IChangeUserDataAction,
  IResendConfirmationEmailAction,
  ISetUserLoginDetailsAction,
  ISetUserLoginDetailsPayload,
  ISetUserTokenPayload,
  ISetUserTokenAction,
  IResendConfirmationEmailFromTokenAction,
  IResendConfirmationEmailFromTokenPayload,
  IValidateEmailPayload,
  IValidateEmailAction,
} from './interface';

import {
  LOGOUT,
  LOGIN_SUCCESS,
  SET_AUTH_STATUS,
  SET_REFRESH_STATUS,
  GET_NEW_TOKEN_WITH_REFRESH,
  FETCH_USER_DATA,
  CHANGE_USER_DATA,
  RESEND_CONFIRMATION_EMAIL,
  SET_USER_LOGIN_DETAILS,
  SET_USER_TOKEN,
  RESEND_CONFIRMATION_EMAIL_FROM_TOKEN,
  VALIDATE_EMAIL,
} from 'store/actionTypes';

export const logout = (): LogoutAction => ({
  type: LOGOUT,
});

export const loginSuccess = (): LoginSuccess => ({
  type: LOGIN_SUCCESS,
});

export const setAuthStatus = (
  payload: SetAuthStatusPayload,
): SetAuthStatusAction => ({
  type: SET_AUTH_STATUS,
  payload,
});

export const setRefreshStatus = (
  payload: ISetRefreshStatusPayload,
): ISetRefreshStatusAction => ({
  type: SET_REFRESH_STATUS,
  payload,
});
export const getNewTokenWithRefresh = (): IGetNewTokenWithRefresh => ({
  type: GET_NEW_TOKEN_WITH_REFRESH,
});

export const fetchUserData = (): IFetchUserDataAction => ({
  type: FETCH_USER_DATA,
});

export const changeUserData = (
  payload: IChangeUserDataPayload,
): IChangeUserDataAction => ({
  type: CHANGE_USER_DATA,
  payload,
});

export const resendConfirmationEmail = (): IResendConfirmationEmailAction => ({
  type: RESEND_CONFIRMATION_EMAIL,
});

export const setUserLoginDetails = (
  payload: ISetUserLoginDetailsPayload,
): ISetUserLoginDetailsAction => ({
  type: SET_USER_LOGIN_DETAILS,
  payload,
});

export const setUserToken = (
  payload: ISetUserTokenPayload,
): ISetUserTokenAction => ({
  type: SET_USER_TOKEN,
  payload,
});

export const resendConfirmationEmailFromToken = (
  payload: IResendConfirmationEmailFromTokenPayload,
): IResendConfirmationEmailFromTokenAction => ({
  type: RESEND_CONFIRMATION_EMAIL_FROM_TOKEN,
  payload,
});
export const validateEmail = (
  payload: IValidateEmailPayload,
): IValidateEmailAction => ({
  type: VALIDATE_EMAIL,
  payload,
});
