import {
  RouteChangeStartAction,
  RouteChangeCompleteAction,
  SetFlashMessagePayload,
  SetFlashMessageAction,
  ChangeIsPageLoadingAction,
  ChangeIsPageLoadingPayload,
  IResetFlashMessageAction,
  IAddLoadingErrorPayload,
  IAddLoadingErrorAction,
  IToggleDarkModeAction,
  IToggleDarkModePayload,
} from './interface';

import {
  ROUTE_CHANGE_START,
  ROUTE_CHANGE_COMPLETE,
  SET_FLASH_MESSAGE,
  CHANGE_IS_PAGE_LOADING,
  RESET_FLASH_MESSAGE,
  ADD_LOADING_ERROR,
  TOGGLE_DARK_MODE,
  CHECK_STORAGE_VALUES,
} from 'store/actionTypes';

export const routeChangeStart = (): RouteChangeStartAction => ({
  type: ROUTE_CHANGE_START,
});
export const routeChangeComplete = (): RouteChangeCompleteAction => ({
  type: ROUTE_CHANGE_COMPLETE,
});

export const setFlashMessage = (
  payload: SetFlashMessagePayload,
): SetFlashMessageAction => ({
  type: SET_FLASH_MESSAGE,
  payload,
});

export const resetFlashMessage = (): IResetFlashMessageAction => ({
  type: RESET_FLASH_MESSAGE,
});

export const changeisPageLoading = (
  payload: ChangeIsPageLoadingPayload,
): ChangeIsPageLoadingAction => ({
  type: CHANGE_IS_PAGE_LOADING,
  payload,
});

export const addLoadingError = (
  payload: IAddLoadingErrorPayload,
): IAddLoadingErrorAction => ({
  type: ADD_LOADING_ERROR,
  payload,
});

export const toggleDarkMode = (
  payload: IToggleDarkModePayload = null,
): IToggleDarkModeAction => ({
  type: TOGGLE_DARK_MODE,
  payload,
});

export const checkStorageValues = () => ({
  type: CHECK_STORAGE_VALUES,
});
