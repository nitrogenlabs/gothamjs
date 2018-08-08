import {WithStyles} from '@material-ui/core/styles';

export interface PromoItemProps {
  readonly details?: string;
  readonly image?: JSX.Element;
  readonly title?: string;
}

export interface PromoRowProps extends WithStyles<any> {
  readonly list?: PromoItemProps[];
}
