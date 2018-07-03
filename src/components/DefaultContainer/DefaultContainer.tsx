import {StyleRulesCallback, withStyles} from '@material-ui/core/styles';
import * as React from 'react';

import {DefaultContainerProps, DefaultContainerState} from '../../types/components/defaultContainer';
import {renderTransition} from '../../utils/routes';
import {TopBar} from '../TopBar/TopBar';

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
  state: any;

  constructor(props: DefaultContainerProps) {
    super(props);

    // Methods
    this.onScroll = this.onScroll.bind(this);

    // Initial state
    this.state = {
      isTopSolid: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {location: {pathname}} = this.props;
    const {location: {pathname: nextPath}} = nextProps;
    const {isTopSolid} = this.state;
    const {isTopSolid: nextSolid} = nextState;

    return pathname !== nextPath || isTopSolid !== nextSolid;
  }

  onScroll(event: React.SyntheticEvent) {
    const {theme} = this.props;

    if(event.currentTarget.scrollTop > theme.mixins.toolbar.minHeight) {
      this.setState({isTopSolid: true});
    } else {
      this.setState({isTopSolid: false});
    }
  }

  render(): JSX.Element {
    const {classes, logo, routes, siteTitle, title} = this.props;
    const {isTopSolid} = this.state;

    return (
      <React.Fragment>
        <TopBar logo={logo} transparent={!isTopSolid} title={title} />
        <div className={classes.content} onScroll={this.onScroll}>
          {renderTransition(routes, siteTitle)}
        </div>
      </React.Fragment>
    );
  }
}

export const DefaultContainer = withStyles(styles, {withTheme: true})(DefaultContainerBase);
