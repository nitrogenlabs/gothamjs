/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import styled from '@emotion/styled';
import {FC} from 'react';

import {Theme} from '../../config/theme';

export interface PromoItemProps {
  readonly details?: string;
  readonly image?: JSX.Element;
  readonly theme?: Theme;
  readonly title?: string;
}

const PromoItemStyled = styled.div`${({theme}: PromoItemProps) => `
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 50;
  padding-left: 50;
  padding-right: 50;

  ${theme.breakpoints.down('xs')} {
    flex-basis: 100%;
    flex-grow: 1;
    padding-left: 30;
    padding-right: 30;
  }
`}`;

const PromoTitleStyled = styled.div`
  fontSize: 16,
  fontWeight: 700
`;

const PromoDetailsStyled = styled.div`
  font-size: 14;
`;

export const PromoItem: FC<PromoItemProps> = ({details, image, title}) => (
  <PromoItemStyled key={title} className="col">
    <div>{image}</div>
    <PromoTitleStyled>{title}</PromoTitleStyled>
    <PromoDetailsStyled>{details}</PromoDetailsStyled>
  </PromoItemStyled>
);