/**
 * Copyright (c) 2024-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import styled from '@emotion/styled';
import {FC, HTMLAttributes, ReactNode} from 'react';

import {Theme} from '../../config/theme';

export interface FeatureItemProps {
  readonly align?: 'left' | 'right';
  readonly details?: string;
  readonly image?: ReactNode;
  readonly title?: string;
}

const ImageStyled = styled.div<HTMLAttributes<any>>`${({theme}: {theme: Theme}) => `
  display: flex;
  height: 300;
  justify-content: center;
  margin-top: 30;
  padding-left: 50;
  padding-right: 50;

  ${theme.breakpoints.down('xs')} {
    margin-bottom: 50;
    padding-left: 30;
    padding-right: 30;
  }
`}`;

export const FeatureImage: FC<FeatureItemProps> = ({image}) => (
  <ImageStyled className="col-md-5 col-xs-12">{image}</ImageStyled>
);