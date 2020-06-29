// @ts-nocheck
import {
  fetchScoringCategories,
  fetchMessageVotes,
  fetchThreadVotes,
  getCurrentUserMessageVote,
  scoringFormSubmit,
} from '../index';
import { getAxios } from 'utils/Axios';

import {
  fetchScoringCategories as fetchScoringCategoriesAction,
  fetchMessageVotes as fetchMessageVotesAction,
  fetchThreadVotes as fetchThreadVotesAction,
  fetchCurrentUserMessageVote as fetchCurrentUserMessageVoteAction,
} from 'store/actions';

import SagaTester from 'redux-saga-tester';
import { votesReducer, initialVoteState } from 'store/reducers';
import {
  SET_SCORING_CATEGORIES,
  SET_MESSAGE_VOTES,
  SET_THREAD_VOTES,
  SET_USER_VOTE,
  FORM_SUBMIT_SUCCESS,
  FETCH_USER_VOTE,
} from 'store/actionTypes';

jest.mock('utils/Axios');

beforeEach(() => {
  getAxios.mockClear();
});

describe('fetchScoringCategories generator', () => {
  test('should run properly', async (done) => {
    getAxios.mockImplementation(
      jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ data: ['something'] })),
      })),
    );

    const sagaTester = new SagaTester({
      initialState: initialVoteState,
      reducers: votesReducer,
    });

    const expectedState = {
      ...initialVoteState,
      scoringCategories: ['something'],
    };

    sagaTester.start(fetchScoringCategories);
    sagaTester.dispatch(fetchScoringCategoriesAction());

    await sagaTester.waitFor(SET_SCORING_CATEGORIES);

    expect(sagaTester.getState()).toStrictEqual(expectedState);

    done();
  });
});
describe('fetchMessageVotes generator', () => {
  test('should run properly', async (done) => {
    const votes = [
      { id: 1, votes: [] },
      { id: 2, votes: [] },
    ];

    getAxios.mockImplementation(
      jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ data: votes })),
      })),
    );

    const sagaTester = new SagaTester({
      initialState: initialVoteState,
      reducers: votesReducer,
    });

    const expectedState = {
      ...initialVoteState,
      messages: [
        {
          id: 1,
          votes,
        },
      ],
    };

    const payloadAction = {
      id: 1,
    };

    sagaTester.start(fetchMessageVotes, {
      payload: payloadAction,
    });
    sagaTester.dispatch(fetchMessageVotesAction(payloadAction));

    await sagaTester.waitFor(SET_MESSAGE_VOTES);

    expect(sagaTester.getState()).toStrictEqual(expectedState);

    done();
  });
});

describe('fetchThreadVotes generator', () => {
  test('should run properly', async (done) => {
    const votes = [
      { id: 1, votes: [] },
      { id: 2, votes: [] },
    ];

    getAxios.mockImplementation(
      jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ data: votes })),
      })),
    );

    const sagaTester = new SagaTester({
      initialState: initialVoteState,
      reducers: votesReducer,
    });

    const expectedState = {
      ...initialVoteState,
      threads: [
        {
          id: 1,
          votes,
        },
      ],
    };

    const payloadAction = {
      id: 1,
    };

    sagaTester.start(fetchThreadVotes, {
      payload: payloadAction,
    });
    sagaTester.dispatch(fetchThreadVotesAction(payloadAction));

    await sagaTester.waitFor(SET_THREAD_VOTES);

    expect(sagaTester.getState()).toStrictEqual(expectedState);

    done();
  });
});

describe('fetchUserMessageVote generator', () => {
  test('should run properly', async (done) => {
    const votes = [
      { id: 1, votes: [] },
      { id: 2, votes: [] },
    ];

    getAxios.mockImplementation(
      jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ data: votes })),
      })),
    );

    const sagaTester = new SagaTester({
      initialState: initialVoteState,
      reducers: votesReducer,
    });

    const expectedState = {
      ...initialVoteState,
      user: [
        {
          id: 1,
          votes,
        },
      ],
    };

    const payloadAction = {
      id: 1,
    };

    sagaTester.start(getCurrentUserMessageVote, {
      payload: payloadAction,
      type: FETCH_USER_VOTE,
    });
    sagaTester.dispatch(fetchCurrentUserMessageVoteAction(payloadAction));

    await sagaTester.waitFor(SET_USER_VOTE);

    expect(sagaTester.getState()).toStrictEqual(expectedState);

    done();
  });
});
describe('scoringFormSubmit generator', () => {
  test('should run properly', async (done) => {
    const votes = [
      { id: 1, votes: [] },
      { id: 2, votes: [] },
    ];

    getAxios.mockImplementation(
      jest.fn(() => ({
        get: jest.fn(() => Promise.resolve()),
        post: jest.fn(() => Promise.resolve()),
      })),
    );

    const sagaTester = new SagaTester({
      initialState: initialVoteState,
      reducers: votesReducer,
    });

    const payloadAction = {
      id: 1,
      votes: {
        'cat-1': 50,
        'cat-2': 80,
        'cat-3': 75,
      },
    };

    sagaTester.start(scoringFormSubmit, {
      payload: payloadAction,
    });
    sagaTester.dispatch(fetchCurrentUserMessageVoteAction(payloadAction));

    await sagaTester.waitFor(FORM_SUBMIT_SUCCESS);

    expect(sagaTester.wasCalled(FORM_SUBMIT_SUCCESS)).toBe(true);

    done();
  });
});
