export interface RatingShowProps {
  criterias: Criteria[];
  disabled?: boolean;
  votes?: any;
  onClick?: (evt: React.MouseEvent) => void;
  handleClose?: () => void;
  showCloseButton?: boolean;
}

type Criteria = {
  name: string;
  value: number;
};
