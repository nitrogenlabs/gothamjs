/**
 * Copyright (c) 2024-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import styled from '@emotion/styled';
import {FC, ReactNode} from 'react';

export interface FooterCopyrightProps {
  readonly children: ReactNode;
}

const CopyrightStyled = styled.div<FooterCopyrightProps>`
  background-color: #808080;
  box-shadow: inset 0 10px 10px -5px rgba(0,0,0,.2);
  display: flex;
  padding-left: 50;
  padding-right: 50;
`;

export const FooterCopyright: FC<FooterCopyrightProps> = ({children}) => (
  <div className="row">
    <CopyrightStyled className="col">
      <div dangerouslySetInnerHTML={{__html: children}} />
    </CopyrightStyled>
  </div>
);
