/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {ThemeOptions} from '@material-ui/core/styles/createMuiTheme';

const palette = {
  error: {
    main: '#ed1c24'
  },
  primary: {
    main: '#bb8eff'
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
    MuiButton: {
      disableFocusRipple: true,
      disableRipple: true,
      disableTouchRipple: true
    },
    MuiCheckbox: {
      disableRipple: true
    },
    MuiIconButton: {
      disableRipple: true
    },
    MuiRadio: {
      disableRipple: true
    },
    MuiSwitch: {
      disableRipple: true
    },
    MuiTouchRipple: {
      disableRipple: true
    }
  },
  typography: {
    display1: {
      color: 'inherit',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit'
    },
    display4: {
      color: 'rgba(0, 0, 0, 0.15)',
      fontFamily: 'inherit',
      fontSize: '50px',
      fontWeight: 100,
      lineHeight: 'inherit'
    },
    fontFamily: ['Open Sans', 'sans-serif'].join(', '),
    fontSize: 13,
    useNextVariants: true
  }
};
