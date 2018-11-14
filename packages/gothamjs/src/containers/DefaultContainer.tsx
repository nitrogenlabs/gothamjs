import {StyleRulesCallback, withStyles} from '@material-ui/core/styles';
import {Flux} from '@nlabs/arkhamjs';
import * as React from 'react';

import {TopBar} from '../components/TopBar';
import {AppConstants} from '../constants/AppConstants';
import {DefaultContainerProps, DefaultContainerState} from '../types/containers/defaultContainer';
import {renderTransition} from '../utils/routes';

const styles: StyleRulesCallback = (theme) => ({
  content: {
    backgroundColor: theme.palette.background.default,
    marginTop: -65,
    minWidth: 0,
    overflowY: 'auto'
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

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  onScroll(): void {
    const {theme} = this.props;
    const changeSolid: boolean = window.scrollY > theme.mixins.toolbar.minHeight;

    if(this.isTopSolid !== changeSolid) {
      this.isTopSolid = changeSolid;
      Flux.dispatch({isTransparent: !changeSolid, type: AppConstants.TOPBAR_SOLID});
    }
  }

  render(): JSX.Element {
    const {classes, routes = [], topBar = {}} = this.props;

    return (
      <React.Fragment>
        <TopBar {...topBar} transparent />
        <div className={classes.content} onScroll={this.onScroll}>
          {renderTransition(routes)}
        </div>
      </React.Fragment>
    );
  }
}

export const DefaultContainer = withStyles(styles, {withTheme: true})(DefaultContainerBase);
export default DefaultContainer;
