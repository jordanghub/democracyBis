import {
  CHANGE_PAGINATION_PAGE,
  SET_PAGINATION_DATA,
  RESET_PAGINATION_DATA,
} from 'store/actionTypes';
import {
  IChangePaginationPageAction,
  IChangePaginationPagePayload,
  ISetPaginationDataAction,
  ISetPaginationDataPayload,
  IResetPaginationDataAction,
  IResetPaginationDataPayload,
} from './interface';

export const changePaginationPage = (
  payload: IChangePaginationPagePayload,
): IChangePaginationPageAction => ({
  type: CHANGE_PAGINATION_PAGE,
  payload,
});

export const setPaginationData = (
  payload: ISetPaginationDataPayload,
): ISetPaginationDataAction => ({
  type: SET_PAGINATION_DATA,
  payload,
});

export const resetPaginationData = (
  payload: IResetPaginationDataPayload,
): IResetPaginationDataAction => ({
  type: RESET_PAGINATION_DATA,
  payload,
});
