import {WithStyles} from '@material-ui/core/styles';

export interface TopBarProps extends WithStyles<any> {
  readonly logo?: JSX.Element;
  readonly open?: boolean;
  readonly title?: string;
  readonly transparent?: boolean;
  readonly user?: object;
}

export interface TopBarState {
  readonly isTransparent: boolean;
}
