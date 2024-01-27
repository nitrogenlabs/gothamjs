/**
 * Copyright (c) 2024-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import styled from '@emotion/styled';
import {FC, HTMLAttributes, ReactNode} from 'react';

import {Theme} from '../../config/theme';
import {FeatureTitle} from './FeatureTitle';
import {FeatureDetails} from './FeatureDetails';

export interface FeatureItemProps {
  readonly align?: 'left' | 'right';
  readonly details?: string;
  readonly image?: ReactNode;
  readonly title?: string;
}

const ContentStyled = styled.div<HTMLAttributes<any>>`
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 30,
    paddingLeft: 50,
    paddingRight: 50,
    [${({theme}: {theme: Theme}) => theme.breakpoints.down('xs')}]: {
      paddingLeft: 30,
      paddingRight: 30
    }
  `;

export const FeatureContent: FC<FeatureItemProps> = ({details, title}) => (
  <ContentStyled className="col-md-7 col-xs-12">
    <FeatureTitle>{title}</FeatureTitle>
    <FeatureDetails>{details}</FeatureDetails>
  </ContentStyled>
);