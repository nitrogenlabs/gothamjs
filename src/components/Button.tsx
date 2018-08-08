import MaterialButton from '@material-ui/core/Button/Button';
import * as React from 'react';

import {ButtonProps} from '../types/components/form';

export class Button extends React.PureComponent<ButtonProps, {}> {
  render(): JSX.Element {
    const {children, ...buttonProps} = this.props;
    return <MaterialButton {...buttonProps}>{children}</MaterialButton>;
  }
}
