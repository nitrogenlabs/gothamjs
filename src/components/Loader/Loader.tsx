/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import styled from "@emotion/styled";

import {ThemeOptions, defaultTheme} from '../../config/theme';
import {Svg} from '../Svg/Svg';

export interface LoaderProps {
  readonly content?: string;
  readonly full?: boolean;
  readonly theme?: ThemeOptions;
}

const LoaderStyled = styled.div`
  ${({ full, theme }: LoaderProps) => `
  align-items: center;
  background-color: ${theme?.palette?.background?.default || "transparent"};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  opacity: 0.95;
  text-align: center;

  ${
    full
      ? `
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    zIndex: ${theme?.zIndex?.tooltip + 1 || 1000}
  `
      : `
    position: relative;
  `
  }
`}
`;

const LoaderTextStyled = styled.div`
  ${({ theme }: LoaderProps) => `
  font-size: 24;
  font-weight: 100;
  margin-top: ${(theme?.spacing as any)?.(1) || 0}px;
`}
`;

const LoaderThrobberStyled = styled.div`
  ${({ theme }: LoaderProps) => `
    animationName: $rotate;
    animationDuration: 750ms;
    animationIterationCount: infinite;
    animationTimingFunction: ${
      theme?.transitions?.easing?.easeInOut || "ease-in-out"
    };
    display: flex;

  @keyframes rotate: {
    0% {
      transform: 'rotate(0deg)'
    },
    100% {
      transform: 'rotate(360deg)'
    }
  }
`}
`;

export const Loader = ({
  content,
  full,
  theme = defaultTheme,
}: LoaderProps) => (
  <LoaderStyled full={full} id="loader" theme={theme}>
    <LoaderThrobberStyled theme={theme}>
      <Svg name="loading" width={50} height={50} />
    </LoaderThrobberStyled>
    {!!content && <LoaderTextStyled theme={theme}>{content}</LoaderTextStyled>}
  </LoaderStyled>
);
