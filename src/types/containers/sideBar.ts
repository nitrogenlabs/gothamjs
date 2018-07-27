import {WithStyles} from '@material-ui/core/styles';

import {GothamMenuItem} from '../menu';

export interface SideBarProps extends WithStyles<any> {
  readonly logo?: JSX.Element;
  readonly menu?: GothamMenuItem[];
  readonly open?: boolean;
}

export interface SideBarState {
  readonly isOpen: boolean;
}
