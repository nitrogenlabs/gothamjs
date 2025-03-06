import styled from '@emotion/styled';
/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import SvgIcon from '@mui/material/SvgIcon';

import {Config} from '../../config/appConfig';

export interface SvgProps {
  readonly className?: string;
  readonly color?: string;
  readonly height?: number;
  readonly name: string;
  readonly width?: number;
}

const SvgIconStyled = styled(SvgIcon)`${({color, height, width}) => `
  color: ${color};
  height: ${height}px;
  width: ${width}px;
`}`;

export const Svg = ({className, color, height = 32, name, width = 32}: SvgProps) => (
  <SvgIconStyled
    className={className}
    color={color as any}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    width={width}>
    <use href={`${Config.get('baseUrl')}/icons/icons.svg#${name}`} />
  </SvgIconStyled>
);
