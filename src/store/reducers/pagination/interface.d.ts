import {
  IChangePaginationPageAction,
  ISetPaginationDataAction,
} from 'store/actions/pagination/interface';

export type PaginationReducerActionTypes =
  | IChangePaginationPageAction
  | ISetPaginationDataAction;
