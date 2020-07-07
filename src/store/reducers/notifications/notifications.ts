import { TAppState, INotificationState } from 'types/state';
import {
  SET_NOTIFICATION_COUNT,
  INCREMENT_NOTIFICATION_COUNT,
  SET_NOTIFICATIONS,
  CLEAR_ALL_NOTIFICATIONS,
} from 'store/actionTypes';
import { INotificationActionTypes } from './interface';

export const initialNotificationState: INotificationState = {
  count: 0,
  items: null,
};

export function notificationsReducer(
  state: INotificationState = initialNotificationState,
  action: INotificationActionTypes,
) {
  switch (action.type) {
    case SET_NOTIFICATION_COUNT: {
      return {
        ...state,
        count: action.payload.count,
      };
    }
    case INCREMENT_NOTIFICATION_COUNT: {
      return {
        ...state,
        count: state.count + 1,
      };
    }

    case SET_NOTIFICATIONS: {
      return {
        ...state,
        items: action.payload,
      };
    }
    case CLEAR_ALL_NOTIFICATIONS: {
      return {
        ...state,
        items: null,
      };
    }
    default: {
      return state;
    }
  }
}

export default notificationsReducer;
