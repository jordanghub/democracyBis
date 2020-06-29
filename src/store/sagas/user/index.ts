import { getAxios } from 'utils/Axios';
import Router from 'next/router';
import cookie from 'js-cookie';

import { takeLatest, put, call, select, debounce } from 'redux-saga/effects';

import {
  REGISTER_FORM_SUBMIT,
  LOGIN_FORM_SUBMIT,
  LOGOUT,
  FETCH_USER_DATA,
  USER_EDIT_FORM_SUBMIT,
  RESEND_CONFIRMATION_EMAIL,
  VALIDATE_EMAIL,
} from 'store/actionTypes';

import {
  setFormError,
  formSubmitSuccess,
  loginSuccess,
  setFlashMessage,
  changeUserData,
  setUserLoginDetails,
  setUserToken,
} from 'store/actions';

import {
  BASE_API_URL,
  REGISTER_ENDPOINT,
  LOGIN_ENDPOINT,
  CURRENT_USER_ENDPOINT,
  RESEND_VALIDATION_EMAIL,
  EMAIL_VALIDATION,
} from 'appConstant/apiEndpoint';
import Axios, { AxiosResponse } from 'axios';
import { ICustomAxiosConfig } from 'types/axios';
import { TState } from 'types/state';
import { SetFlashMessagePayload } from 'store/actions/app/interface';

export function* fetchUserData() {
  const axios = getAxios();

  const customConfig: ICustomAxiosConfig = {
    redirectOnFailure: false,
  };
  try {
    const response: AxiosResponse = yield axios.get(
      `${BASE_API_URL}${CURRENT_USER_ENDPOINT}`,
      customConfig,
    );

    yield put(changeUserData(response.data));
  } catch (err) {}
}

export function* logout() {
  if (cookie.get('token')) {
    cookie.remove('token');
    Router.push('/');
  }
  yield put(
    setFlashMessage({
      type: 'success',
      message: 'Vous êtes déconnecté',
    }),
  );
}
export function* loginFormSubmit({ type, payload }) {
  const axios = getAxios();
  try {
    const response = yield axios.post(`${BASE_API_URL}${LOGIN_ENDPOINT}`, {
      username: payload.username,
      password: payload.password,
    });

    if (response.status === 201) {
      const token = response.data.access_token;
      const refreshToken = response.data.refresh_token;
      if (typeof window !== 'undefined') {
        cookie.set('token', token);
        cookie.set('refresh_token', refreshToken);
      }

      yield put(
        setUserToken({
          token,
        }),
      );
      yield put(loginSuccess());
      yield call(fetchUserData);

      Router.push('/');

      yield put(
        setFlashMessage({
          type: 'success',
          message: 'Vous êtes connecté',
        }),
      );
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 400) {
        yield put(
          setFormError({
            formName: 'login',
            errors: {
              submitError: "Nom d'utilisateur ou mot de passe invalide",
            },
          }),
        );
      } else if (err.response.status === 401) {
        if (err.response.data && err.response.data.type) {
          if (err.response.data.type === 'not_activated') {
            yield put(
              setFormError({
                formName: 'login',
                errors: {
                  submitError: "Votre compte n'est pas activé",
                  errorType: err.response.data.type,
                },
              }),
            );
            yield put(
              setUserLoginDetails({
                username: payload.username,
                password: payload.password,
              }),
            );
          }
        }
      }
    }
  }
}

export function* registerFormSubmit({ type, payload }) {
  const axios = getAxios();

  const data = new FormData();

  data.append('username', payload.username);
  data.append('password', payload.password);
  data.append('email', payload.email);

  if (payload.avatar) {
    data.append('avatar', payload.avatar[0]);
  }

  try {
    const response = yield axios.post(
      `${BASE_API_URL}${REGISTER_ENDPOINT}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    if (response.data) {
      if (response.status === 201) {
        yield put(
          formSubmitSuccess({
            formName: 'register',
          }),
        );
      }
    }
  } catch (err) {
    const { data, status } = err.response;

    if (data.message) {
      yield put(setFormError({ formName: 'register', errors: data.message }));
    }
  }
}

export function* editUserFormSubmit({ type, payload }) {
  const axios = getAxios();

  const userData = yield select((state: TState) => state.user.userData);

  const data = new FormData();

  if (payload.currentPassword) {
    data.append('password', payload.currentPassword);
  }

  if (payload.password) {
    data.append('newPassword', payload.password);
  }

  if (userData.email !== payload.email) {
    data.append('email', payload.email);
  }

  if (payload.avatar) {
    data.append('avatar', payload.avatar[0]);
  }

  try {
    const response = yield axios.post(
      `${BASE_API_URL}${CURRENT_USER_ENDPOINT}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    if (response.data) {
      if (response.status === 201) {
        yield put(changeUserData(response.data));
        Router.push('/');
        yield put(
          setFlashMessage({
            type: 'success',
            message: 'Vos informations ont été modifiées avec succès',
          }),
        );
      }
    }
  } catch (err) {
    const { data, status } = err.response;

    if (data.message) {
      yield put(
        setFormError({ formName: 'editProfile', errors: data.message }),
      );
    }
  }
}

export function* resendConfirmationEmail() {
  const { userData } = yield select((state: TState) => state.user);

  if (userData) {
    return;
  }

  const { loginDetails } = yield select((state: TState) => state.user);

  if (!loginDetails) {
    return;
  }

  const axios = Axios.create();

  try {
    const response: AxiosResponse = yield axios.post(
      `${BASE_API_URL}${RESEND_VALIDATION_EMAIL}`,
      {
        username: loginDetails.username,
        password: loginDetails.password,
      },
    );

    yield put(
      setFlashMessage({
        type: 'success',
        message:
          "Un nouveau lien d'activation a été envoyé à l'adresse email donnée lors de l'inscription",
      }),
    );
  } catch (err) {
    yield put(
      setFlashMessage({
        type: 'error',
        message: "Une erreur est survenue lors de l'envoi de l'email",
      }),
    );
  }
}

export function* emailValidation({ payload, type }) {
  let message: SetFlashMessagePayload = {
    type: 'error',
    message: 'Un erreur est survenue, merci de réessayer plus tard',
  };

  let isTokenExpired = false;

  const { token } = payload;

  if (!token) {
    message = {
      type: 'error',
      message: "Le lien d'activation n'est pas valide",
    };

    yield put(setFlashMessage(message));
    return;
  }

  const axios = getAxios();

  try {
    yield axios.post(`${BASE_API_URL}${EMAIL_VALIDATION}`, { token });
    message = {
      type: 'success',
      message:
        'Votre compte a été activé, vous pouvez maintenant vous connecter',
    };

    Router.push('/login');
    yield put(setFlashMessage(message));
  } catch (err) {
    const errorType = err?.response?.data?.type;

    if (err.response) {
      if (errorType) {
        if (errorType === 'invalid_token') {
          message = {
            type: 'error',
            message: "Le lien d'activation n'est pas valide",
          };
        } else if (errorType === 'token_expired') {
          message = {
            type: 'error',
            message: "Le lien d'activation a expiré",
          };
          isTokenExpired = true;
        } else if (errorType === 'already_active') {
          message = {
            type: 'error',
            message: 'Votre compte est déjà activé',
          };
        }
      }
      if (err.response.status === 404) {
        message = {
          type: 'error',
          message: "Le lien d'activation n'est pas ou plus valide",
        };
      }
    }

    message.message +=
      ' , entrez vos identifiants pour recevoir un nouveau lien';
    Router.push('/login');
    yield put(setFlashMessage(message));
  }
}

export const userSagas = [
  takeLatest(REGISTER_FORM_SUBMIT, registerFormSubmit),
  takeLatest(LOGIN_FORM_SUBMIT, loginFormSubmit),
  takeLatest(FETCH_USER_DATA, fetchUserData),
  takeLatest(LOGOUT, logout),
  takeLatest(USER_EDIT_FORM_SUBMIT, editUserFormSubmit),
  debounce(600, RESEND_CONFIRMATION_EMAIL, resendConfirmationEmail),
  takeLatest(VALIDATE_EMAIL, emailValidation),
];
