import {WithStyles} from '@material-ui/core/styles';

export interface FeatureItemProps extends WithStyles<any> {
  readonly align?: 'left' | 'right';
  readonly details?: string;
  readonly image?: JSX.Element;
  readonly title?: string;
}
