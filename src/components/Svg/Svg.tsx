/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {cn} from '@nlabs/utils';

import {Config} from '../../config/appConfig.js';

import type {FC} from 'react';

export interface SvgProps {
  readonly className?: string;
  readonly color?: string;
  readonly height?: number;
  readonly name: string;
  readonly width?: number;
}

export const Svg: FC<SvgProps> = ({
  className,
  color = 'inherit',
  height = 32,
  name,
  width = 32
}) => {
  return (
    <svg
      className={cn('w-full h-full', className)}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        color,
        fill: color,
        height: `${height}px`,
        width: `${width}px`
      }}
    >
      <use href={`${Config.get('baseUrl')}/icons/icons.svg#${name}`} />
    </svg>
  );
};
