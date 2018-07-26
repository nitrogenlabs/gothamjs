import MaterialButton from '@material-ui/core/Button/Button';
import * as React from 'react';

import {ButtonProps} from '../../types/components/form';

export class Button extends React.PureComponent<ButtonProps, {}> {
  render(): JSX.Element {
    const {children, href, type} = this.props;
    return <MaterialButton href={href} type={type}>{children}</MaterialButton>;
  }
}
