/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import MaterialButton from '@material-ui/core/Button/Button';
import * as React from 'react';

import {ButtonProps} from '../types/components/button';

export class Button extends React.PureComponent<ButtonProps, {}> {
  render(): JSX.Element {
    const {children, ...buttonProps} = this.props;
    return <MaterialButton {...buttonProps}>{children}</MaterialButton>;
  }
}
