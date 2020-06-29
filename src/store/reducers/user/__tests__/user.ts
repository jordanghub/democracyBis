import { initialUserState, userReducer } from '../user';
import {
  loginSuccess,
  logout,
  setAuthStatus,
  setRefreshStatus,
} from 'store/actions';

describe('userReducer', () => {
  test('initialState', () => {
    expect(userReducer(undefined, { type: null, payload: null })).toEqual(
      initialUserState,
    );
  });

  test('handle LOGIN_SUCCESS', () => {
    const expected = {
      ...initialUserState,
      isLoggedIn: true,
    };

    expect(userReducer(initialUserState, loginSuccess())).toEqual(expected);
  });
  test('handle LOGOUT', () => {
    const initialState = {
      ...initialUserState,
      isLoggedIn: true,
    };
    const expected = {
      ...initialUserState,
      isLoggedIn: false,
    };
    expect(userReducer(initialState, logout())).toEqual(expected);
  });
  test('handle SET_AUTH_STATUS', () => {
    const initialState = {
      ...initialUserState,
      isLoggedIn: true,
    };
    const expected = {
      ...initialUserState,
      isLoggedIn: false,
    };

    const payload = {
      status: false,
    };
    expect(userReducer(initialState, setAuthStatus(payload))).toEqual(expected);
  });
  test('handle SET_REFRESH_STATUS', () => {
    const payload = {
      status: true,
    };

    const expected = {
      ...initialUserState,
      refreshFailed: true,
    };

    expect(userReducer(initialUserState, setRefreshStatus(payload))).toEqual(
      expected,
    );
  });
});
