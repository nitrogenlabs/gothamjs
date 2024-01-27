/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import styled from '@emotion/styled';
import {FC} from 'react';

import {Theme} from '../../config/theme';

export interface SplashIntroProps {
  readonly backgroundImage?: string;
  readonly backgroundTextColor?: string;
  readonly children?: JSX.Element | JSX.Element[];
  readonly buttons?: {
    readonly label: string;
    readonly url: string;
  }[];
  readonly image?: JSX.Element;
  readonly text?: string;
  readonly theme?: Theme;
}

const SplashIntroStyled = styled.div`${({backgroundImage, theme}: SplashIntroProps) => `
  background-color: ${theme.palette.background.default};
  background-image: url(${backgroundImage});
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`}`;

const SplashContentStyled = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 500;
`;

export const SplashIntro: FC<SplashIntroProps> = ({backgroundImage, children}) => (
  <SplashIntroStyled backgroundImage={backgroundImage}>
    <div className="row justify-content-center">
      <div className="col">
        <SplashContentStyled>
          {children}
        </SplashContentStyled>
      </div>
    </div>
  </SplashIntroStyled>
);
