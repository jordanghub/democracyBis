import { ThreadHomepage } from 'types/thread';
import { CategoryType } from 'types/categories';
import { Color } from '@material-ui/lab';

export interface TState {
  app: TAppState;
  forms: TFormState;
  thread?: IThreadState;
  votes: IVotesState;
  user: IUserState;
  pagination: IPaginationState;
  notifications: INotificationState;
}

export interface INotificationState {
  count: number;
  items?: any;
}

export interface IThreadState {
  latestThreads?: ThreadHomepage[];
  categoryThreads?: ThreadHomepage[];
  threadSingle?: any;
  categories?: CategoryType[];
  searchResults?: ThreadHomepage[];
}

export interface IUserState {
  isLoggedIn: boolean | null;
  refreshFailed: boolean | null;
  userData?: any;
  token?: string;
  loginDetails?: {
    username: string;
    password: string;
  };
}

export interface IVotesState {
  threads: any;
  messages: any;
  user: any;
  scoringCategories?: any;
}

export interface TAppState {
  isDarkMode: boolean;
  isPageLoading: boolean;
  loadingErrors: {
    [key: string]: {
      code: number;
      message?: string;
    };
  };
  flashMessage?: {
    type: Color;
    message: string;
  };
}

export interface IPaginationState {
  [key: string]: {
    count: number;
    pages: number;
    currentPage: number;
  };
}

export interface TFormState {
  forms: any;
}
