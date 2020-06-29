import { CHANGE_PAGINATION_PAGE, SET_PAGINATION_DATA } from 'store/actionTypes';

export interface IChangePaginationPageAction {
  type: typeof CHANGE_PAGINATION_PAGE;
  payload: IChangePaginationPagePayload;
}

export interface IChangePaginationPagePayload {
  resource: string;
  page: number;
}

export interface ISetPaginationDataAction {
  type: typeof SET_PAGINATION_DATA;
  payload;
}

export interface ISetPaginationDataPayload {
  count: number;
  pages: number;
  currentPage: number;
  resource: string;
}
