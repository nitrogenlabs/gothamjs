/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {ThemeOptions} from '@material-ui/core/styles/createMuiTheme';

const palette = {
  error: {
    dark: '#C4272F',
    light: '#FFEAEB',
    main: '#ed1c24'
  },
  primary: {
    dark: '#1A0935',
    light: '#bb8eff',
    main: '#341861'
  },
  secondary: {
    main: '#442b69'
  }
};

export const defaultTheme: ThemeOptions = {
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: 'none'
      },
      outlined: {
        borderColor: palette.primary.main,
        borderRadius: 0,
        borderWidth: 2
      },
      root: {
        transition: '.3s ease-in all'
      }
    },
    MuiDrawer: {
      paper: {
        width: 275
      }
    },
    MuiFormControl: {
      root: {
        display: 'flex'
      }
    },
    MuiListItemText: {
      primary: {
        fontSize: 14
      }
    },
    MuiNativeSelect: {
      select: {
        height: 24
      }
    }
  },
  palette,
  props: {
    MuiButtonBase: {
      disableRipple: false,
      disableTouchRipple: false,
      focusRipple: false
    },
    MuiCheckbox: {
      disableRipple: true
    },
    MuiIconButton: {
      disableRipple: true,
      disableTouchRipple: true
    },
    MuiMenuItem: {
      disableRipple: true,
      disableTouchRipple: true
    },
    MuiRadio: {
      disableRipple: true,
      disableTouchRipple: true
    },
    MuiSwitch: {
      disableRipple: true,
      disableTouchRipple: true
    }
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(', '),
    fontSize: 13,
    h1: {
      color: 'rgba(0, 0, 0, 0.15)',
      fontFamily: 'inherit',
      fontSize: '50px',
      fontWeight: 100,
      lineHeight: 'inherit'
    },
    h4: {
      color: 'inherit',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit'
    },
    useNextVariants: true
  }
};
