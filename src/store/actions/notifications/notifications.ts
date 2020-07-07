import {
  SET_NOTIFICATION_COUNT,
  INCREMENT_NOTIFICATION_COUNT,
  FETCH_NOTIFICATIONS,
  DELETE_NOTIFICATION,
  SET_NOTIFICATIONS,
  CLEAR_ALL_NOTIFICATIONS,
  DELETE_ALL_NOTIFICATIONS,
  GET_ACTIVE_NOTIFICATION_COUNT,
} from 'store/actionTypes';
import {
  ISetNotificationCountPayload,
  ISetNotificationCountAction,
  IIncrementNotificationCountAction,
  IFetchNotificationsAction,
  IDeleteNotificationAction,
  IDeleteNotificationPayload,
  ISetNotificationsAction,
  IDeleteAllNotificationsAction,
  IClearAllNotificationsAction,
  IFetchNotificationsPayload,
} from './interface';

export const setNotificationCount = (
  payload: ISetNotificationCountPayload,
): ISetNotificationCountAction => ({
  type: SET_NOTIFICATION_COUNT,
  payload,
});
export const incrementNotificationCount = (): IIncrementNotificationCountAction => ({
  type: INCREMENT_NOTIFICATION_COUNT,
});

export const fetchNotifications = (
  payload: IFetchNotificationsPayload = null,
): IFetchNotificationsAction => ({
  type: FETCH_NOTIFICATIONS,
  payload,
});
export const deleteNotfication = (
  payload: IDeleteNotificationPayload,
): IDeleteNotificationAction => ({
  type: DELETE_NOTIFICATION,
  payload,
});

export const setNotifications = (payload): ISetNotificationsAction => ({
  type: SET_NOTIFICATIONS,
  payload,
});

export const clearNotifications = (): IClearAllNotificationsAction => ({
  type: CLEAR_ALL_NOTIFICATIONS,
});

export const deleteNotifications = (): IDeleteAllNotificationsAction => ({
  type: DELETE_ALL_NOTIFICATIONS,
});

export const getActiveNotificationCount = () => ({
  type: GET_ACTIVE_NOTIFICATION_COUNT,
});
