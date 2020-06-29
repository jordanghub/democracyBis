import { appReducer, initialAppState } from '../app';
import {
  routeChangeStart,
  routeChangeComplete,
  setFlashMessage,
  resetFlashMessage,
  changeisPageLoading,
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
});
