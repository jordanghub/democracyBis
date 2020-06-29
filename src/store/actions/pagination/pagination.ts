import { CHANGE_PAGINATION_PAGE, SET_PAGINATION_DATA } from 'store/actionTypes';
import {
  IChangePaginationPageAction,
  IChangePaginationPagePayload,
  ISetPaginationDataAction,
  ISetPaginationDataPayload,
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
