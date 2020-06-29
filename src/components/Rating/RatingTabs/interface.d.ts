import {
  FetchThreadVotePayload,
  FetchMessagesVotePayload,
} from 'store/actions/votes/interface';
import { ScoringCategory } from 'types/categories';
export interface RatingTabsProps {
  voteDisabled?: boolean;
  messageType?: string;
  itemId?: number;
  isLoggedIn: boolean;
  votes: any;
  scoringCategories: ScoringCategory[];
  fetchScoringCategoriesAction: () => void;
  fetchThreadVotesAction: (payload: FetchThreadVotePayload) => void;
  fetchMessageVotesAction: (payload: FetchMessagesVotePayload) => void;
  scoringCategories: () => void;
  handleClose: () => void;
}
