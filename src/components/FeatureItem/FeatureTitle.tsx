/**
 * Copyright (c) 2024-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import styled from '@emotion/styled';
import {FC, ReactNode} from 'react';

export interface FeatureTitleProps {
  readonly children: ReactNode;
}

const TitleStyled = styled.div`
  font-size: 24;
  font-weight: 100;
`;

export const FeatureTitle: FC<FeatureTitleProps> = ({children}) => (
  <TitleStyled>{children}</TitleStyled>
);
