import {WithStyles} from '@material-ui/core/styles';

import {TopBarProps} from '../components/topBar';

export interface DefaultContainerProps extends WithStyles<any> {
  readonly location?: Location;
  readonly routes?: any[];
  readonly title?: string;
  readonly topBar?: TopBarProps;
}

export interface DefaultContainerState {
  readonly isTopSolid?: boolean;
}
