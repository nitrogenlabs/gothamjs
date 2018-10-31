import {WithStyles} from '@material-ui/core/styles';

import {GothamMenuItem} from '../gotham';

export interface TopBarProps extends WithStyles<any> {
  readonly logo?: JSX.Element;
  readonly logoAlt?: JSX.Element;
  readonly menu?: GothamMenuItem[];
  readonly open?: boolean;
  readonly solidTextColor?: string;
  readonly title?: string;
  readonly transparent?: boolean;
  readonly transparentTextColor?: string;
  readonly user?: object;
}

export interface TopBarState {
  readonly isTransparent: boolean;
}
