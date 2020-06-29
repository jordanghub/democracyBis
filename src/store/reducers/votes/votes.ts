import {
  SET_SCORING_CATEGORIES,
  SET_MESSAGE_VOTES,
  SET_THREAD_VOTES,
  SET_USER_VOTE,
} from 'store/actionTypes';

import { IVotesState } from 'types/state';
import { VotesReducerActionTypes } from './interface';

export const initialVoteState: IVotesState = {
  threads: [],
  messages: [],
  user: [],
  scoringCategories: null,
};

export function votesReducer(
  state: IVotesState = initialVoteState,
  action: VotesReducerActionTypes,
): IVotesState {
  switch (action.type) {
    case SET_SCORING_CATEGORIES: {
      return {
        ...state,
        scoringCategories: action.payload,
      };
    }

    case SET_MESSAGE_VOTES: {
      const { id, votes } = action.payload;
      const newMessages = state.messages.filter((el) => el.id !== id);

      newMessages.push({
        id,
        votes,
      });

      return {
        ...state,
        messages: [...newMessages],
      };
    }

    case SET_THREAD_VOTES: {
      const { id, votes } = action.payload;
      const newThreads = state.threads.filter((el) => el.id !== id);

      newThreads.push({
        id,
        votes,
      });

      return {
        ...state,
        threads: [...newThreads],
      };
    }

    case SET_USER_VOTE: {
      const { id, votes } = action.payload;
      const newVotes = state.user.filter((el) => el.id !== id);

      newVotes.push({
        id,
        votes,
      });

      return {
        ...state,
        user: [...newVotes],
      };
    }

    default:
      return state;
  }
}
