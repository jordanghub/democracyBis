export interface NavProps {
  isLoggedIn: boolean;
  logoutCallback: () => void;
  categories: Array<any>;
  userData?: any;
  notificationCount: number;
}
