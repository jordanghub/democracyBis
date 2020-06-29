import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TState } from 'types/state';
import {
  setInitialFormData,
  registerFormSubmit,
  resetFormData,
  createThreadFormSubmit,
  createThreadAnswerFormSubmit,
  loginFormSubmit,
  userEditFormSubmit,
} from 'store/actions';

export const useForms = () => {
  const dispatch = useDispatch();

  const forms = useSelector((state: TState) => state.forms);

  const setInitialFormDataAction = useCallback(
    (payload) => dispatch(setInitialFormData(payload)),
    [dispatch],
  );

  const registerFormSubmitAction = useCallback(
    (payload) => dispatch(registerFormSubmit(payload)),
    [dispatch],
  );

  const createThreadFormSubmitAction = useCallback(
    (payload) => dispatch(createThreadFormSubmit(payload)),
    [dispatch],
  );
  const createThreadAnswerFormSubmitAction = useCallback(
    (payload) => dispatch(createThreadAnswerFormSubmit(payload)),
    [dispatch],
  );
  const loginFormSubmitAction = useCallback(
    (payload) => dispatch(loginFormSubmit(payload)),
    [dispatch],
  );
  const editUserProfileFormSubmitAction = useCallback(
    (payload) => dispatch(userEditFormSubmit(payload)),
    [dispatch],
  );

  const resetFormDataAction = useCallback(
    (payload) => dispatch(resetFormData(payload)),
    [dispatch],
  );

  return useMemo(
    () => ({
      forms,
      setInitialFormData: setInitialFormDataAction,
      resetFormData: resetFormDataAction,
      registerFormSubmit: registerFormSubmitAction,
      createThreadFormSubmit: createThreadFormSubmitAction,
      createThreadAnswerFormSubmit: createThreadAnswerFormSubmitAction,
      loginFormSubmit: loginFormSubmitAction,
      userEditFormSubmit: editUserProfileFormSubmitAction,
    }),
    [
      forms,
      setInitialFormDataAction,
      resetFormDataAction,
      registerFormSubmitAction,
      createThreadFormSubmitAction,
      createThreadAnswerFormSubmitAction,
      loginFormSubmitAction,
      editUserProfileFormSubmitAction,
    ],
  );
};
