import {
  SET_NOTIFICATION_COUNT,
  INCREMENT_NOTIFICATION_COUNT,
} from 'store/actionTypes';
import {
  ISetNotificationCountPayload,
  ISetNotificationCountAction,
  IIncrementNotificationCountAction,
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
