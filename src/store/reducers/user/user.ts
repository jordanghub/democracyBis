import cookies from 'js-cookie';

import {
  LOGOUT,
  LOGIN_SUCCESS,
  SET_AUTH_STATUS,
  SET_REFRESH_STATUS,
  CHANGE_USER_DATA,
  SET_USER_LOGIN_DETAILS,
  SET_USER_TOKEN,
} from 'store/actionTypes';

import { TAppState, IUserState } from 'types/state';
import { UserReducerActionTypes } from './interface';

export const initialUserState: IUserState = {
  isLoggedIn: null,
  refreshFailed: null,
  userData: null,
};

export function userReducer(
  state: IUserState = initialUserState,
  action: UserReducerActionTypes,
): IUserState {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
      };
    }

    case LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
      };
    }

    case SET_AUTH_STATUS: {
      return {
        ...state,
        isLoggedIn: action.payload.status,
      };
    }
    case SET_REFRESH_STATUS: {
      return {
        ...state,
        refreshFailed: action.payload.status,
      };
    }

    case CHANGE_USER_DATA: {
      return {
        ...state,
        userData: action.payload,
      };
    }

    case SET_USER_LOGIN_DETAILS: {
      return {
        ...state,
        loginDetails: {
          ...action.payload,
        },
      };
    }

    case SET_USER_TOKEN: {
      return {
        ...state,
        token: action.payload.token,
      };
    }

    default:
      return state;
  }
}
