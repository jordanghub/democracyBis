import { ScoringCategory } from 'types/categories';

export interface RatingFormProps {
  criterias: ScoringCategory[];
  disabled?: boolean;
  votes?: any;
  messageId: number;
}
