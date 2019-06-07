/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon';
import {makeStyles} from '@material-ui/styles';
import * as React from 'react';

import {Config} from '../../config/app';
import {SvgProps} from './Svg.types';

export const Svg = ({color, height = 32, name, width = 32}: SvgProps) => {
  const useStyles = makeStyles({
    icon: {color, height, width}
  });
  const classes = useStyles({});

  return (
    <SvgIcon className={classes.icon} color="primary" viewBox={`0 0 ${width} ${height}`}>
      <use href={`${Config.get('baseUrl')}/icons/icons.svg#${name}`} />
    </SvgIcon>
  );
};
