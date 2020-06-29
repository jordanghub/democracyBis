import { getAxios } from 'utils/Axios';

import { takeLatest, put } from 'redux-saga/effects';

import {
  FETCH_SCORING_CATEGORIES,
  FETCH_THREAD_VOTES,
  SCORING_FORM_SUBMIT,
  FETCH_MESSAGE_VOTES,
  FETCH_USER_VOTE,
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

export function* getCurrentUserMessageVote({ type, payload }) {
  const axios = getAxios();

  const customConfig: ICustomAxiosConfig = {
    redirectOnFailure: false,
  };
  try {
    const response = yield axios.get(
      `${BASE_API_URL}${MESSAGES_ENDPOINT}/${payload.id}/votes/me`,
      customConfig,
    );

    yield put(
      setCurrentUserMessageVote({
        id: payload.id,
        votes: response.data,
      }),
    );
  } catch (err) {}
}

export function* scoringFormSubmit({ type, payload }) {
  const axios = getAxios();

  const entries = Object.entries(payload.votes);

  if (entries.length === 0) {
    return;
  }

  const criterias = [];

  for (const entry of entries) {
    const catId = entry[0].split('-')[1];

    const catItem = {
      id: Number(catId),
      value: entry[1],
    };
    criterias.push(catItem);
  }

  const data = {
    messageId: payload.id,
    categories: criterias,
  };
  try {
    const response = yield axios.post(
      `${BASE_API_URL}${MESSAGES_ENDPOINT}/${payload.id}/votes`,
      data,
    );

    yield put(
      formSubmitSuccess({
        formName: `scoring${payload.id}`,
      }),
    );

    yield put(
      setFlashMessage({
        type: 'success',
        message: 'Vote enregistré avec succès',
      }),
    );
  } catch (err) {}
}

export function* fetchThreadVotes({ type, payload }) {
  const axios = getAxios();

  try {
    const response = yield axios.get(
      `${BASE_API_URL}${THREAD_LIST_ROUTE}/${payload.id}/votes`,
    );
    // Put the scoring inside of the threadShowMessage

    yield put(
      setThreadVotes({
        id: payload.id,
        votes: response.data,
      }),
    );
  } catch (err) {}
}
export function* fetchMessageVotes({ type, payload }) {
  const axios = getAxios();

  try {
    const response = yield axios.get(
      `${BASE_API_URL}${MESSAGES_ENDPOINT}/${payload.id}/votes`,
    );
    // Put the scoring inside of the threadShowMessage

    yield put(
      setMessageVote({
        id: payload.id,
        votes: response.data,
      }),
    );

    // Put the scoring inside the thread in thread[]
  } catch (err) {}
}

export function* fetchScoringCategories() {
  const axios = getAxios();

  try {
    const response: AxiosResponse = yield axios.get(
      `${BASE_API_URL}${SCORING_ENDPOINT}`,
    );

    yield put(setScoringCategories(response.data));
  } catch (err) {}
}

export const votesSagas = [
  takeLatest(FETCH_SCORING_CATEGORIES, fetchScoringCategories),
  takeLatest(FETCH_THREAD_VOTES, fetchThreadVotes),
  takeLatest(FETCH_MESSAGE_VOTES, fetchMessageVotes),
  takeLatest(SCORING_FORM_SUBMIT, scoringFormSubmit),
  takeLatest(FETCH_USER_VOTE, getCurrentUserMessageVote),
];
