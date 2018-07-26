import {StyleRulesCallback, withStyles} from '@material-ui/core/styles';
import {Flux} from '@nlabs/arkhamjs';
import * as React from 'react';

import {AppConstants} from '../constants/AppConstants';
import {DefaultContainerProps, DefaultContainerState} from '../types/containers/defaultContainer';
import {renderTransition} from '../utils/routes';
import {TopBar} from './TopBar';

const styles: StyleRulesCallback = (theme) => ({
  content: {
    backgroundColor: theme.palette.background.default,
    minWidth: 0,
    overflowY: 'auto',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  }
});

export class DefaultContainerBase extends React.Component<DefaultContainerProps, DefaultContainerState> {
  isTopSolid: boolean = false;

  constructor(props: DefaultContainerProps) {
    super(props);

    // Methods
    this.onScroll = this.onScroll.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const {location: {pathname}} = this.props;
    const {location: {pathname: nextPath}} = nextProps;

    return pathname !== nextPath;
  }

  onScroll(event: React.SyntheticEvent) {
    const {theme} = this.props;
    let changeSolid: boolean = false;

    if(event.currentTarget.scrollTop > theme.mixins.toolbar.minHeight) {
      changeSolid = true;
    }

    if(this.isTopSolid !== changeSolid) {
      this.isTopSolid = changeSolid;
      Flux.dispatch({isTransparent: !changeSolid, type: AppConstants.TOPBAR_SOLID});
    }
  }

  render(): JSX.Element {
    const {classes, logo, topBar = {}, routes, title} = this.props;
    const {menu = []} = topBar;

    return (
      <React.Fragment>
        <TopBar logo={logo} menu={menu} title={title} transparent />
        <div className={classes.content} onScroll={this.onScroll}>
          {renderTransition(routes)}
        </div>
      </React.Fragment>
    );
  }
}

export const DefaultContainer = withStyles(styles, {withTheme: true})(DefaultContainerBase);
export default DefaultContainer;
