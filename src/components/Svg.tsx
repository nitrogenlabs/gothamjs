/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import * as React from 'react';

import {Config} from '../config/app';

const useStyles = makeStyles({
  icon: ({color, height, width}: any) => ({
    color,
    height,
    width
  })
});

export interface SvgProps {
  readonly className?: string;
  readonly color?: string;
  readonly height?: number;
  readonly name: string;
  readonly width?: number;
}

export const Svg = ({className, color, height = 32, name, width = 32}: SvgProps) => {
  const classes = useStyles({color, height, width});

  return (
    <SvgIcon className={clsx(classes.icon, className)} viewBox={`0 0 ${width} ${height}`}>
      <use href={`${Config.get('baseUrl')}/icons/icons.svg#${name}`} />
    </SvgIcon>
  );
};
