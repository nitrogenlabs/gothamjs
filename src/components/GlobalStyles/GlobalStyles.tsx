/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Global} from '@emotion/react';
import {Theme, useMediaQuery} from '@mui/material';
import {FC} from 'react';

export interface GlobalStylesProps {
  readonly isDarkMode?: boolean;
  readonly theme?: Theme;
}

export const GlobalStyles: FC<GlobalStylesProps> = ({theme}) => {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <Global styles={{
      'a, .link': {
        color: theme.palette.primary.main,
        '&:hover, &:active': {
          color: theme.palette.primary.dark
        }
      },
      h1: {
        color: isDarkMode ? theme.palette.primary.contrastText : theme.palette.common.black
      },
      '.col, .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col-auto, .col-lg, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-auto, .col-md, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md-auto, .col-sm, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-auto': {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
      },
      '.container': {
        [`@media (min-width: ${theme.breakpoints.values.sm}px)`]: {
          maxWidth: 'none'
        }
      },
      '.noFocusOutline a:focus, .noFocusOutline button:focus': {
        outline: 'none'
      },
      '.row': {
        flexDirection: 'row',
        marginLeft: -theme.spacing(2),
        marginRight: -theme.spacing(2)
      },
      '.text-center': {
        textAlign: 'center'
      },
      '.subtitle': {
        color: '#5e6977',
        fontSize: '22px',
        fontWeight: 100,
        lineHeight: '32px',
        margin: '20px auto 40px',
        width: '55%'
      },
      '.view': {
        display: 'flex',
        flex: 1,
        height: '100vh'
      },
      img: {
        alignSelf: 'flex-start',
        maxHeight: '100%',
        maxWidth: '100%'
      },
      '.routeWrapper': {
        display: 'flex',
        flex: 1,
        minHeight: '100vh',
        position: 'relative'
      },
      '.routeWrapper > div': {
        position: 'relative',
        width: '100%'
      }
    }} />
  );
};