/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import styled from '@emotion/styled';
import {FC} from 'react';

import {PromoItem, PromoItemProps} from './PromoItem';

export interface PromoRowProps {
  readonly list?: PromoItemProps[];
}

const PromoRowStyled = styled.div`
  padding-bottom: 80;
  padding-top: 60;
`;

export const PromoRow: FC<PromoRowProps> = ({list}) => (
  <div className="container">
    <PromoRowStyled className="row justify-content-center">
      {list.map((item) => <PromoItem {...item}/>)}
    </PromoRowStyled>
  </div>
);