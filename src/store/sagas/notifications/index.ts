import { getAxios } from 'utils/Axios';

import { takeLatest, put } from 'redux-saga/effects';

import {
  FETCH_SCORING_CATEGORIES,
  FETCH_THREAD_VOTES,
  SCORING_FORM_SUBMIT,
  FETCH_MESSAGE_VOTES,
  FETCH_USER_VOTE,
  SET_NOTIFICATION_COUNT,
} from 'store/actionTypes';

import {
  formSubmitSuccess,
  setScoringCategories,
  setThreadVotes,
  setMessageVote,
  setCurrentUserMessageVote,
  setFlashMessage,
} from 'store/actions';

import {
  THREAD_LIST_ROUTE,
  BASE_API_URL,
  SCORING_ENDPOINT,
  MESSAGES_ENDPOINT,
} from 'appConstant/apiEndpoint';
import { AxiosResponse } from 'axios';
import { ICustomAxiosConfig } from 'types/axios';

// export function* getCurrentUserMessageVote({ type, payload }) {
//   const axios = getAxios();

//   const customConfig: ICustomAxiosConfig = {
//     redirectOnFailure: false,
//   };
//   try {
//     const response = yield axios.get(
//       `${BASE_API_URL}${MESSAGES_ENDPOINT}/${payload.id}/votes/me`,
//       customConfig,
//     );

//     yield put(
//       setCurrentUserMessageVote({
//         id: payload.id,
//         votes: response.data,
//       }),
//     );
//   } catch (err) {}
// }

export const notificationsSaga = [];
