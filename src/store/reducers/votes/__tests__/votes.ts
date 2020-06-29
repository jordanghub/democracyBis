import { initialVoteState, votesReducer } from '../votes';
import {
  setScoringCategories,
  setMessageVote,
  setThreadVotes,
  setCurrentUserMessageVote,
} from 'store/actions';

describe('votesReducer', () => {
  test('initialState', () => {
    expect(votesReducer(undefined, { type: null, payload: null })).toEqual(
      initialVoteState,
    );
  });

  test('handle SET_SCORING_CATEGORIES', () => {
    const categories = ['some', 'categories'];

    const expected = {
      ...initialVoteState,
      scoringCategories: categories,
    };

    expect(
      votesReducer(initialVoteState, setScoringCategories(categories)),
    ).toEqual(expected);
  });
  test('handle SET_MESSAGE_VOTES', () => {
    const messageVotes = {
      id: 1,
      votes: ['some votes'],
    };

    const expected = {
      ...initialVoteState,
      messages: [
        {
          id: messageVotes.id,
          votes: messageVotes.votes,
        },
      ],
    };

    expect(
      votesReducer(initialVoteState, setMessageVote(messageVotes)),
    ).toEqual(expected);
  });
  test('handle SET_THREAD_VOTES', () => {
    const threadVotes = {
      id: 1,
      votes: ['some votes'],
    };

    const expected = {
      ...initialVoteState,
      threads: [
        {
          id: threadVotes.id,
          votes: threadVotes.votes,
        },
      ],
    };

    expect(votesReducer(initialVoteState, setThreadVotes(threadVotes))).toEqual(
      expected,
    );
  });
  test('handle SET_USER_VOTE', () => {
    const userVotes = {
      id: 1,
      votes: ['some votes'],
    };

    const expected = {
      ...initialVoteState,
      user: [
        {
          id: userVotes.id,
          votes: userVotes.votes,
        },
      ],
    };

    expect(
      votesReducer(initialVoteState, setCurrentUserMessageVote(userVotes)),
    ).toEqual(expected);
  });
});

// case SET_THREAD_VOTES: {
//   const { id, votes } = action.payload;
//   const newThreads = state.threads.filter((el) => el.id !== id);

//   newThreads.push({
//     id,
//     votes,
//   });

//   return {
//     ...state,
//     threads: [...newThreads],
//   };
// }

// case SET_USER_VOTE: {
//   const { id, votes } = action.payload;
//   const newVotes = state.user.filter((el) => el.id !== id);

//   newVotes.push({
//     id,
//     votes,
//   });

//   return {
//     ...state,
//     user: [...newVotes],
//   };
// }
