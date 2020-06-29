import { TransitionStatus } from 'react-transition-group/Transition';
export interface IRatingProps {
  voteDisabled?: boolean;
  messageType?: string;
  itemId?: number;
}

export interface IPopperStyleProps {
  state?: TransitionStatus;
  fadeDuration?: number;
}
