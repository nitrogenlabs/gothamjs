import {WithStyles} from '@material-ui/core/styles';

import {GothamMenuItem} from '../menu';

export interface TopBarProps extends WithStyles<any> {
  readonly logoAlt?: JSX.Element;
  readonly logoDefault?: JSX.Element;
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
