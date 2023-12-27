/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {makeStyles} from '@mui/styles';
import * as React from 'react';

const useStyle = makeStyles((theme: any) => ({
  body: {
    fontSize: 16
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  errorCode: {
    alignItems: 'center',
    color: theme.palette.neutral.main,
    display: 'flex',
    fontSize: 100,
    fontWeight: 700,
    opacity: 0.3,
    position: 'relative',
    transition: 'all 0.25s ease-out',
    userSelect: 'none'
  },
  h1: {
    fontSize: 30,
    fontWeight: 100
  },
  shadow: {
  }
}));

export const NotFoundView = () => {
  const classes = useStyle({});

  return (
    <div className={classes.container}>
      <div className={classes.errorCode}>404</div>
      <h1 className={classes.h1}>Page Not Found</h1>
      <div className={classes.body}>
        Could not find the page you were looking for. Please try again or contact support.
      </div>
    </div>
  );
};

export default NotFoundView;
