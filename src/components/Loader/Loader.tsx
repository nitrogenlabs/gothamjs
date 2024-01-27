/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import styled from '@emotion/styled';

import {Theme} from '../../config/theme';
import {Svg} from '../Svg/Svg';

export interface LoaderProps {
  readonly content?: string;
  readonly full?: boolean;
  readonly theme?: Theme;
}

const LoaderStyled = styled.div`${({full, theme}: LoaderProps) => `
  align-items: center;
  background-color: ${theme.palette.background.default};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  opacity: 0.95;
  text-align: center;

  ${full ? `
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    zIndex: ${theme.zIndex.tooltip + 1}
  ` : `
    position: relative;
  `}
`}`;

const LoaderTextStyled = styled.div`${({theme}: LoaderProps) => `
  font-size: 24;
  font-weight: 100;
  margin-top: ${theme.spacing(1)};
`}`;

const LoaderThrobberStyled = styled.div`${({theme}: LoaderProps) => `
    animationName: $rotate;
    animationDuration: 750ms;
    animationIterationCount: infinite;
    animationTimingFunction: ${theme.transitions.easing.easeInOut};
    display: flex;

  @keyframes rotate: {
    0% {
      transform: 'rotate(0deg)'
    },
    100% {
      transform: 'rotate(360deg)'
    }
  }
`}`;

export const Loader = ({content, full}: LoaderProps) => (
  <LoaderStyled full={full} id="loader">
    <LoaderThrobberStyled>
      <Svg name="loading" width={50} height={50} />
    </LoaderThrobberStyled>
    {!content && (
      <LoaderTextStyled>
        {content}
      </LoaderTextStyled>
    )}
  </LoaderStyled>
);
