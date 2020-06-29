import {
  SET_NOTIFICATION_COUNT,
  INCREMENT_NOTIFICATION_COUNT,
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
