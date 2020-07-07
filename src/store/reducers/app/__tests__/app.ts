import { appReducer, initialAppState } from '../app';
import {
  routeChangeStart,
  routeChangeComplete,
  setFlashMessage,
  resetFlashMessage,
  changeisPageLoading,
  addLoadingError,
  toggleDarkMode,
} from 'store/actions';

describe('appReducer', () => {
  test('should return default state', () => {
    expect(appReducer(undefined, { type: null })).toEqual(initialAppState);
  });

  test('handle ROUTE_CHANGE_START', () => {
    const expected = {
      ...initialAppState,
      isPageLoading: true,
      flashMessage: null,
    };
    expect(appReducer(initialAppState, routeChangeStart())).toEqual(expected);
  });

  test('handle ROUTE_CHANGE_COMPLETE', () => {
    const expected = {
      ...initialAppState,
      isPageLoading: false,
    };
    expect(appReducer(initialAppState, routeChangeComplete())).toEqual(
      expected,
    );
  });

  test('handle SET_FLASH_MESSAGE', () => {
    const fakeFlashMessage = {
      type: 'error',
      message: 'Test message',
    };
    const expected = {
      ...initialAppState,
      isPageLoading: false,
      flashMessage: fakeFlashMessage,
    };

    expect(
      // @ts-ignore
      appReducer(initialAppState, setFlashMessage(fakeFlashMessage)),
    ).toEqual(expected);
  });
  test('handle RESET_FLASH_MESSAGE', () => {
    const fakeFlashMessage = {
      type: 'error',
      message: 'Test message',
    };
    const expected = {
      ...initialAppState,
      flashMessage: null,
    };

    const state = appReducer(
      initialAppState,
      // @ts-ignore
      setFlashMessage(fakeFlashMessage),
    );

    expect(appReducer(state, resetFlashMessage())).toEqual(expected);
  });
  test('handle CHANGE_IS_PAGE_LOADING', () => {
    const payload = {
      status: true,
    };

    const expected = {
      ...initialAppState,
      isPageLoading: true,
    };

    expect(appReducer(initialAppState, changeisPageLoading(payload))).toEqual(
      expected,
    );
  });
  test('handle ADD_LOADING_ERROR', () => {
    const payload = {
      code: 400,
      message: 'some message',
      key: 'hello',
    };

    const expected = {
      ...initialAppState,
      loadingErrors: {
        [payload.key]: {
          code: payload.code,
          message: payload.message,
        },
      },
    };

    expect(appReducer(initialAppState, addLoadingError(payload))).toEqual(
      expected,
    );
  });

  test('handle TOGGLE_DARK_MODE without payload', () => {
    const mockSetItem = jest.fn(() => true);
    const setItemSpy = jest.spyOn(
      Object.getPrototypeOf(window.localStorage),
      'setItem',
    );

    setItemSpy.mockImplementationOnce(mockSetItem);

    const expected = {
      ...initialAppState,
      isDarkMode: true,
    };

    // @ts-ignore
    expect(appReducer(initialAppState, toggleDarkMode())).toEqual(expected);
    expect(mockSetItem).toHaveBeenCalledTimes(1);
  });

  test('handle TOGGLE_DARK_MODE with payload', () => {
    // @ts-ignore
    const mockSetItem = jest.fn(() => true);
    const setItemSpy = jest.spyOn(
      Object.getPrototypeOf(window.localStorage),
      'setItem',
    );

    setItemSpy.mockImplementationOnce(mockSetItem);
    const expected = {
      ...initialAppState,
      isDarkMode: true,
    };

    const payload = {
      status: true,
    };

    // @ts-ignore
    expect(appReducer(initialAppState, toggleDarkMode(payload))).toEqual(
      expected,
    );
    expect(mockSetItem).toHaveBeenCalledTimes(0);
  });
});
