/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon';
import * as React from 'react';

import {SvgProps} from '../types/components/svg';
import {styledComponent} from '../utils/styles';

export const Svg = ({color, height = 32, name, width = 32}: SvgProps) => {
  const StyledIcon = styledComponent(SvgIcon)({color, height, width});

  return (
    <StyledIcon color="primary" viewBox={`0 0 ${width} ${height}`}>
      <use href={`./icons/icons.svg#${name}`} />
    </StyledIcon>
  );
};
