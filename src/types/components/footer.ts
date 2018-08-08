import {WithStyles} from '@material-ui/core/styles';

import {GothamMenuItem} from '../gotham';

export interface FooterProps extends WithStyles<any> {
  readonly copyright?: string;
  readonly logo?: JSX.Element;
  readonly menu?: GothamMenuItem[];
}
