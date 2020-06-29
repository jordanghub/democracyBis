import { TState } from 'types/state';

export interface IInfiniteScrollProps {
  children: any;
  maxPage: number;
  currentPage: number;
  itemCount: number;
  numberPerPage: number;
  getReduxKey: (state: TState) => any;
  reduxAction: (payload) => void;
}
