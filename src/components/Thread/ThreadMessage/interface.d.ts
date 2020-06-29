import { SetFlashMessagePayload } from 'store/actions/app/interface';
import { ISetInitialFormDataAction } from 'store/actions/forms/interface';

export interface ThreadMessageProps {
  content: string;
  sources?: ThreadSource[];
  id: number;
  author: any;
  date: string;
  threadId: number;
  highlightedItems: any;
  scoringCategories: any;
  votes: any;

  setInitialFormDataAction: (payload: ISetInitialFormDataPayload) => void;
  setFlashMessageAction: (payload: SetFlashMessagePayload) => void;
}
type ThreadSource = {
  id: number;
  label: string;
  url: string;
};
