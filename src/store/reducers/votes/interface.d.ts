import {
  SetScoringCategoriesAction,
  SetMessageVotesAction,
  SetThreadVoteAction,
  SetCurrentUserVoteAction,
} from 'store/actions/app/interface';

export type VotesReducerActionTypes =
  | SetScoringCategoriesAction
  | SetMessageVotesAction
  | SetThreadVoteAction
  | SetCurrentUserVoteAction;
