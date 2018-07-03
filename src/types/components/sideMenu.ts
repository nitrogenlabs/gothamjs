import {WithStyles} from '@material-ui/core/styles';

export interface SideMenuProps extends WithStyles<any> {
  readonly menu?: any[];
  readonly open?: boolean;
}

export interface SideMenuState {
  readonly isOpen: boolean;
}
