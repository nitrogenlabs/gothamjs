/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import styled from '@emotion/styled';
import {FC, HTMLAttributes, ReactNode} from 'react';

import {FeatureImage} from './FeatureImage';
import {FeatureContent} from './FeatureContent';

export interface FeatureItemProps {
  readonly align?: 'left' | 'right';
  readonly details?: string;
  readonly image?: ReactNode;
  readonly title?: string;
}

const ContainerStyled = styled.div<HTMLAttributes<any>>`
  background-color: #e9e9e9;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 80;
  padding-top: 60;
`;

export const FeatureItem: FC<FeatureItemProps> = (props) => {
  const {align = 'left'} = props;

  return (
    <ContainerStyled>
      <div className="container">
        <div className="row justify-content-center>">
          {align === 'left'
            ? (
              <>
                <FeatureContent {...props}/>
                <FeatureImage {...props}/>
              </>
            )
            : (
              <>
                <FeatureImage {...props}/>
                <FeatureContent {...props}/>
              </>
            )}
        </div>
      </div>
    </ContainerStyled>
  );
};
