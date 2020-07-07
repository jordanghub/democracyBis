import {
  SET_NOTIFICATION_COUNT,
  INCREMENT_NOTIFICATION_COUNT,
  FETCH_NOTIFICATIONS,
  SET_NOTIFICATIONS,
  DELETE_NOTIFICATION,
  CLEAR_ALL_NOTIFICATIONS,
  DELETE_ALL_NOTIFICATIONS,
} from 'store/actionTypes';

export interface ISetNotificationCountAction {
  type: typeof SET_NOTIFICATION_COUNT;
  payload: ISetNotificationCountPayload;
}
export interface IIncrementNotificationCountAction {
  type: typeof INCREMENT_NOTIFICATION_COUNT;
}

export interface ISetNotificationCountPayload {
  count: number;
}

export interface IFetchNotificationsAction {
  type: typeof FETCH_NOTIFICATIONS;
  payload?: IFetchNotificationsPayload;
}

export interface IFetchNotificationsPayload {
  page: number;
}

export interface ISetNotificationsAction {
  type: typeof SET_NOTIFICATIONS;
  payload: any;
}

export interface IDeleteNotificationAction {
  type: typeof DELETE_NOTIFICATION;
  payload: IDeleteNotificationPayload;
}

export interface IDeleteNotificationPayload {
  id: number;
}

export interface IClearAllNotificationsAction {
  type: typeof CLEAR_ALL_NOTIFICATIONS;
}

export interface IDeleteAllNotificationsAction {
  type: typeof DELETE_ALL_NOTIFICATIONS;
}
