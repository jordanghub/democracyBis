import {
  ISetNotificationCountAction,
  IIncrementNotificationCountAction,
} from 'store/actions/notifications/interface';

export type INotificationActionTypes =
  | ISetNotificationCountAction
  | IIncrementNotificationCountAction;
