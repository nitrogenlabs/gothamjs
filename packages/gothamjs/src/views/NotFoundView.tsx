/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {StyleRulesCallback} from '@material-ui/core/styles';
import * as React from 'react';

import {NotFoundViewProps, NotFoundViewState} from '../types/views/notFound';
import {initComponent} from '../utils/components';

const styles: StyleRulesCallback = () => ({
  body: {
    fontSize: 16
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center'
  },
  errorCode: {
    marginTop: -250
  },
  h1: {
    fontSize: 46,
    fontWeight: 100
  },
  shadow: {
    color: '#fff',
    fontSize: 150,
    fontWeight: 700,
    letterSpacing: '-0.05em',
    position: 'relative',
    textShadow: '-15px 5px 12px rgba(0, 0, 0, 0.1)',
    textTransform: 'uppercase',
    transition: 'all 0.25s ease-out',
    userSelect: 'none'
  }
});

export class NotFoundViewBase extends React.PureComponent<NotFoundViewProps, NotFoundViewState> {
  render(): JSX.Element {
    const {classes} = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className={`col ${classes.errorCode}`}>
            <span className={classes.shadow}>4</span>
            <span className={classes.shadow}>0</span>
            <span className={classes.shadow}>4</span>
          </div>
        </div>

        <div className="row">
          <div className={`col ${classes.h1}`}>Page Not Found</div>
        </div>

        <div className="row">
          <div className={`col ${classes.body}`}>
            Could not find the page you were looking for. Please try again or contact support.
          </div>
        </div>
      </div>
    );
  }
}

export const NotFoundView = initComponent(module, NotFoundViewBase, styles);
export default NotFoundView;
