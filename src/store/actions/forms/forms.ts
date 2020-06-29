import {
  REGISTER_FORM_SUBMIT,
  LOGIN_FORM_SUBMIT,
  CREATE_THREAD_FORM_SUBMIT,
  SET_FORM_ERROR,
  FORM_SUBMIT_SUCCESS,
  CREATE_THREAD_ANSWER_FORM_SUBMIT,
  SET_INITIAL_FORM_DATA,
  RESET_FORM_DATA,
  USER_EDIT_FORM_SUBMIT,
} from 'store/actionTypes/forms';

import {
  RegisterFormSubmitAction,
  RegisterFormSubmitPayload,
  LoginFormSubmitAction,
  LoginFormSubmitPayload,
  CreateThreadSubmitAction,
  SetFormErrorPayload,
  SetFormErrorAction,
  CreateThreadSubmitPayload,
  FormSubmitSuccessPayload,
  FormSubmitSuccessAction,
  CreateThreadAnswerSubmitPayload,
  CreateThreadAnswerSubmitAction,
  ISetInitialFormDataAction,
  ISetInitialFormDataPayload,
  IResetFormDataAction,
  IResetFormDataPayload,
  IUserEditFormSubmitAction,
} from './interface';

export const registerFormSubmit = (
  payload: RegisterFormSubmitPayload,
): RegisterFormSubmitAction => ({
  type: REGISTER_FORM_SUBMIT,
  payload,
});
export const loginFormSubmit = (
  payload: LoginFormSubmitPayload,
): LoginFormSubmitAction => ({
  type: LOGIN_FORM_SUBMIT,
  payload,
});
export const createThreadFormSubmit = (
  payload: CreateThreadSubmitPayload,
): CreateThreadSubmitAction => ({
  type: CREATE_THREAD_FORM_SUBMIT,
  payload,
});

export const createThreadAnswerFormSubmit = (
  payload: CreateThreadAnswerSubmitPayload,
): CreateThreadAnswerSubmitAction => ({
  type: CREATE_THREAD_ANSWER_FORM_SUBMIT,
  payload,
});

export const setFormError = (
  payload: SetFormErrorPayload,
): SetFormErrorAction => ({
  type: SET_FORM_ERROR,
  payload,
});
export const formSubmitSuccess = (
  payload: FormSubmitSuccessPayload,
): FormSubmitSuccessAction => ({
  type: FORM_SUBMIT_SUCCESS,
  payload,
});

export const setInitialFormData = (
  payload: ISetInitialFormDataPayload,
): ISetInitialFormDataAction => ({
  type: SET_INITIAL_FORM_DATA,
  payload,
});

export const resetFormData = (
  payload: IResetFormDataPayload,
): IResetFormDataAction => ({
  type: RESET_FORM_DATA,
  payload,
});

export const userEditFormSubmit = (payload): IUserEditFormSubmitAction => ({
  type: USER_EDIT_FORM_SUBMIT,
  payload,
});
