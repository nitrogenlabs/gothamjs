/**
 * Copyright (c) 2020-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import styled from '@emotion/styled';
import {Theme} from '@mui/material';
import CircularProgress, {CircularProgressProps} from '@mui/material/CircularProgress';

interface CircularProgressStyledProps extends CircularProgressProps {
  readonly theme?: Theme;
}

const CircularProgressStyled = styled(CircularProgress)<CircularProgressStyledProps>`${({theme}) => `
  color: ${theme.palette.common.white};
  margin-left: ${theme.spacing(1)};
`}`;

export const ButtonSpinner = () => (
  <CircularProgressStyled
    color="inherit"
    size={20}
  />
);
