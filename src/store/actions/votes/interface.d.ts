import {
  FETCH_SCORING_CATEGORIES,
  SET_SCORING_CATEGORIES,
  FETCH_THREAD_VOTES,
  SET_THREAD_VOTES,
  FETCH_MESSAGE_VOTES,
  SET_MESSAGE_VOTES,
  SCORING_FORM_SUBMIT,
  SET_USER_VOTE,
  FETCH_USER_VOTE,
} from 'store/actionTypes';

export interface FetchScoringCategoriesAction {
  type: typeof FETCH_SCORING_CATEGORIES;
}

export interface SetScoringCategoriesAction {
  type: typeof SET_SCORING_CATEGORIES;
  payload: any;
}

export interface FetchThreadVoteAction {
  type: typeof FETCH_THREAD_VOTES;
  payload: FetchThreadVotePayload;
}
export type FetchThreadVotePayload = {
  id: number;
};

export interface SetThreadVoteAction {
  type: typeof SET_THREAD_VOTES;
  payload: SetThreadVotePayload;
}
export type SetThreadVotePayload = {
  id: number;
  votes: any;
};
export interface FetchMessagesVoteAction {
  type: typeof FETCH_MESSAGE_VOTES;
  payload: FetchMessagesVotePayload;
}
export type FetchMessagesVotePayload = {
  id: number;
};

export interface SetMessageVotesAction {
  type: typeof SET_MESSAGE_VOTES;
  payload: SetMessageVotesPayload;
}

export type SetMessageVotesPayload = {
  id: number;
  votes: any;
};

export interface FetchCurrentUserMessageVotesAction {
  type: typeof FETCH_USER_VOTE;
  payload: FetchCurrentUserMessageVotesPayload;
}

export type FetchCurrentUserMessageVotesPayload = {
  id: number;
};

export interface SetCurrentUserVoteAction {
  type: typeof SET_USER_VOTE;
  payload: SetCurrentUserVotePayload;
}

export type SetCurrentUserVotePayload = {
  id: number;
  votes: any;
};

export interface ScoringFormSubmitAction {
  type: typeof SCORING_FORM_SUBMIT;
  payload: ScoringFormSubmitPayload;
}

export type ScoringFormSubmitPayload = {
  id: number;
  votes: any;
};
