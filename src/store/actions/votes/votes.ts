import {
  FetchScoringCategoriesAction,
  SetScoringCategoriesAction,
  ScoringFormSubmitAction,
  ScoringFormSubmitPayload,
  FetchCurrentUserMessageVotesAction,
  FetchCurrentUserMessageVotesPayload,
  SetCurrentUserVoteAction,
  SetCurrentUserVotePayload,
  FetchThreadVotePayload,
  FetchThreadVoteAction,
  SetThreadVoteAction,
  SetThreadVotePayload,
  FetchMessagesVotePayload,
  SetMessageVotesAction,
  SetMessageVotesPayload,
  FetchMessagesVoteAction,
} from './interface';

import {
  FETCH_SCORING_CATEGORIES,
  SET_SCORING_CATEGORIES,
  FETCH_THREAD_VOTES,
  SET_THREAD_VOTES,
  FETCH_MESSAGE_VOTES,
  SET_MESSAGE_VOTES,
  SCORING_FORM_SUBMIT,
  FETCH_USER_VOTE,
  SET_USER_VOTE,
} from 'store/actionTypes';

export const fetchScoringCategories = (): FetchScoringCategoriesAction => ({
  type: FETCH_SCORING_CATEGORIES,
});

export const setScoringCategories = (payload): SetScoringCategoriesAction => ({
  type: SET_SCORING_CATEGORIES,
  payload,
});

export const fetchThreadVotes = (
  payload: FetchThreadVotePayload,
): FetchThreadVoteAction => ({
  type: FETCH_THREAD_VOTES,
  payload,
});

export const setThreadVotes = (
  payload: SetThreadVotePayload,
): SetThreadVoteAction => ({
  type: SET_THREAD_VOTES,
  payload,
});

export const fetchMessageVotes = (
  payload: FetchMessagesVotePayload,
): FetchMessagesVoteAction => ({
  type: FETCH_MESSAGE_VOTES,
  payload,
});

export const setMessageVote = (
  payload: SetMessageVotesPayload,
): SetMessageVotesAction => ({
  type: SET_MESSAGE_VOTES,
  payload,
});

export const fetchCurrentUserMessageVote = (
  payload: FetchCurrentUserMessageVotesPayload,
): FetchCurrentUserMessageVotesAction => ({
  type: FETCH_USER_VOTE,
  payload,
});

export const setCurrentUserMessageVote = (
  payload: SetCurrentUserVotePayload,
): SetCurrentUserVoteAction => ({
  type: SET_USER_VOTE,
  payload,
});

export const scoringFormSubmit = (
  payload: ScoringFormSubmitPayload,
): ScoringFormSubmitAction => ({
  type: SCORING_FORM_SUBMIT,
  payload,
});
