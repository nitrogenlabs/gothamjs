/**
 * Copyright (c) 2024-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import styled from '@emotion/styled';
import {FC, ReactNode} from 'react';

export interface FeatureDetailsProps {
  readonly children: ReactNode;
}

const DetailsStyled = styled.div`
  fontSize: 14
`;

export const FeatureDetails: FC<FeatureDetailsProps> = ({children}) => (
  <DetailsStyled>{children}</DetailsStyled>
);
