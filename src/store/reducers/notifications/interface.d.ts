import {
  ISetNotificationCountAction,
  IIncrementNotificationCountAction,
  ISetNotificationsAction,
  IClearAllNotificationsAction,
} from 'store/actions/notifications/interface';

export type INotificationActionTypes =
  | ISetNotificationCountAction
  | IIncrementNotificationCountAction
  | ISetNotificationsAction
  | IClearAllNotificationsAction;
