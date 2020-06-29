// @ts-nocheck
jest.mock('utils/Axios');
jest.mock('next/router', () => ({
  push: jest.fn(() => {}),
}));

import SagaTester from 'redux-saga-tester';
import Router from 'next/router';

import { loginFormSubmit, registerFormSubmit } from '../index';
import { getAxios } from 'utils/Axios';

import {
  userReducer,
  appReducer,
  initialAppState,
  initialUserState,
  initialFormsState,
  formsReducer,
} from 'store/reducers';

import {
  loginFormSubmit as loginFormSubmitAction,
  registerFormSubmit as registerFormSubmitAction,
} from 'store/actions';

import {
  FORM_SUBMIT_SUCCESS,
  LOGIN_FORM_SUBMIT,
  SET_FLASH_MESSAGE,
  SET_FORM_ERROR,
  LOGIN_SUCCESS,
  REGISTER_FORM_SUBMIT,
} from 'store/actionTypes';

loginFormSubmit;
beforeEach(() => {
  getAxios.mockClear();
  Router.push.mockClear();
});

describe('loginFormSubmit generator', () => {
  test('should run properly', async (done) => {
    getAxios.mockImplementation(
      jest.fn(() => ({
        post: jest.fn(() =>
          Promise.resolve({ status: 201, data: { access_token: 'a token' } }),
        ),
      })),
    );

    Router.push.mockImplementation(jest.fn(() => {}));

    const sagaTester = new SagaTester({
      initialState: {
        app: { ...initialAppState },
        user: { ...initialUserState },
      },
      reducers: {
        app: appReducer,
        user: userReducer,
      },
    });

    const payload = { username: 'test', password: 'test' };

    const expectedState = {
      app: {
        ...initialAppState,
        flashMessage: { type: 'success', message: 'Vous êtes connecté' },
      },
      user: {
        ...initialUserState,
        isLoggedIn: true,
      },
    };

    sagaTester.start(loginFormSubmit, { type: LOGIN_FORM_SUBMIT, payload });
    sagaTester.dispatch(loginFormSubmitAction(payload));

    await sagaTester.waitFor(SET_FLASH_MESSAGE);

    expect(Router.push).toHaveBeenCalledTimes(1);
    expect(sagaTester.getState()).toStrictEqual(expectedState);
    expect(sagaTester.numCalled(SET_FLASH_MESSAGE)).toEqual(1);
    expect(sagaTester.numCalled(LOGIN_SUCCESS)).toEqual(1);

    done();
  });
  test('login failed', async (done) => {
    getAxios.mockImplementation(
      jest.fn(() => ({
        post: jest.fn(() =>
          Promise.reject({
            response: {
              status: 400,
            },
          }),
        ),
      })),
    );

    Router.push.mockImplementation(jest.fn(() => {}));

    const sagaTester = new SagaTester({
      initialState: {
        app: { ...initialAppState },
        forms: { ...initialFormsState },
      },
      reducers: {
        app: appReducer,
        forms: formsReducer,
      },
    });

    const payload = { username: 'test', password: 'test' };

    const expectedState = {
      app: {
        ...initialAppState,
      },
      forms: {
        ...initialFormsState,
        forms: {
          login: {
            errors: {
              submitError: "Nom d'utilisateur ou mot de passe invalide",
            },
            submitSuccess: false,
          },
        },
      },
    };

    sagaTester.start(loginFormSubmit, { type: LOGIN_FORM_SUBMIT, payload });
    sagaTester.dispatch(loginFormSubmitAction(payload));

    await sagaTester.waitFor(SET_FORM_ERROR);

    expect(sagaTester.getState()).toStrictEqual(expectedState);

    expect(sagaTester.numCalled(SET_FORM_ERROR)).toEqual(1);
    done();
  });
});

describe('registerFormSubmit', () => {
  test('register success', async (done) => {
    getAxios.mockImplementation(
      jest.fn(() => ({
        post: jest.fn(() => Promise.resolve({ status: 201, data: {} })),
      })),
    );

    const sagaTester = new SagaTester({
      initialState: {
        forms: { ...initialFormsState },
      },
      reducers: {
        forms: formsReducer,
      },
    });

    const data = {
      username: 'test',
      password: 'password',
      email: 'email@test.fr',
    };

    sagaTester.start(registerFormSubmit, {
      type: REGISTER_FORM_SUBMIT,
      payload: data,
    });
    sagaTester.dispatch(registerFormSubmitAction(data));

    const expectedState = {
      forms: {
        forms: {
          register: {
            errors: null,
            initialData: null,
            submitSuccess: true,
          },
        },
      },
    };

    await sagaTester.waitFor(FORM_SUBMIT_SUCCESS);
    expect(sagaTester.getState()).toStrictEqual(expectedState);
    expect(sagaTester.numCalled(FORM_SUBMIT_SUCCESS)).toEqual(1);

    done();
  });

  test('register failed', async (done) => {
    getAxios.mockImplementation(
      jest.fn(() => ({
        post: jest.fn(() =>
          Promise.reject({
            response: {
              status: 400,
              data: {
                message: { something: 'something' },
              },
            },
          }),
        ),
      })),
    );

    const sagaTester = new SagaTester({
      initialState: {
        forms: { ...initialFormsState },
      },
      reducers: {
        forms: formsReducer,
      },
    });

    const data = {
      username: 'test',
      password: 'password',
      email: 'email@test.fr',
    };

    sagaTester.start(registerFormSubmit, {
      type: REGISTER_FORM_SUBMIT,
      payload: data,
    });
    sagaTester.dispatch(registerFormSubmitAction(data));

    const expectedState = {
      forms: {
        forms: {
          register: {
            errors: { something: 'something' },
            submitSuccess: false,
          },
        },
      },
    };

    await sagaTester.waitFor(SET_FORM_ERROR);
    expect(sagaTester.getState()).toStrictEqual(expectedState);
    expect(sagaTester.numCalled(SET_FORM_ERROR)).toEqual(1);

    done();
  });
});
