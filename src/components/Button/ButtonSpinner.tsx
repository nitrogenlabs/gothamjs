/**
 * Copyright (c) 2020-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme: any) => ({
  spinner: {
    color: theme.palette.primary.contrastText,
    marginLeft: theme.spacing(1)
  }
}));

export const ButtonSpinner = () => {
  const classes = useStyles();

  return (
    <CircularProgress
      className={classes.spinner}
      color="inherit"
      size={20}
    />
  );
};
