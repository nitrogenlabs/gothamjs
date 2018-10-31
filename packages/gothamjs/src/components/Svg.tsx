import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon';
import * as React from 'react';

import {styledComponent} from '../utils/styles';

export const Svg = ({height = 32, name, width = 32}) => {
  const StyledIcon = styledComponent(SvgIcon)({height, width});

  return (
    <StyledIcon color="primary" viewBox={`0 0 ${width} ${height}`}>
      <use href={`./icons/icons.svg#${name}`} />
    </StyledIcon>
  );
};
