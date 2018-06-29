import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon';
import * as React from 'react';

import {styledComponent} from '../../utils/styles';

export interface IconProps {
  readonly height?: number;
  readonly name: string;
  readonly width?: number;
}

export class Icon extends React.Component<IconProps, {}> {
  static defaultProps: object = {
    height: 32,
    width: 32
  };

  render(): JSX.Element {
    const {height, name, width} = this.props;
    const StyledIcon = styledComponent(SvgIcon)({height, width});

    return (
      <StyledIcon color="primary" viewBox={`0 0 ${width} ${height}`}>
        <use href={`./icons/icons.svg#${name}`} />
      </StyledIcon>
    );
  }
}
