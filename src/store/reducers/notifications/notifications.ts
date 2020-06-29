import { TAppState, INotificationState } from 'types/state';
import {
  SET_NOTIFICATION_COUNT,
  INCREMENT_NOTIFICATION_COUNT,
} from 'store/actionTypes';
import { INotificationActionTypes } from './interface';

export const initialNotificationState: INotificationState = {
  count: 0,
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
    default: {
      return state;
    }
  }
}

export default notificationsReducer;
