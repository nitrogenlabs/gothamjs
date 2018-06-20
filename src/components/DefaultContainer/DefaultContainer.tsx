import {StyleRulesCallback, WithStyles, withStyles} from '@material-ui/core/styles';
import * as React from 'react';

import {GothamRoute} from '../GothamRoute/GothamRoute';
import {TopBar} from '../TopBar/TopBar';

const styles: StyleRulesCallback = (theme) => ({
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    minWidth: 0,
    padding: theme.spacing.unit * 3
  }
});

interface Props {
  readonly routes: any[];
  readonly siteTitle: string;
  readonly title: string;
}

export type DefaultContainerProps = Props & WithStyles<typeof styles>;

export interface DefaultContainerState {
  readonly isTopSolid: boolean;
}

export class DefaultContainerBase extends React.Component<DefaultContainerProps, DefaultContainerState> {
  constructor(props: DefaultContainerProps) {
    super(props);

    // Methods
    this.onScroll = this.onScroll.bind(this);

    // Initial state
    this.state = {
      isTopSolid: false
    };
  }

  componentDidMount(): void {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll(event) {
    const {theme} = this.props;

    if(event.pageY > theme.mixins.toolbar.minHeight) {
      this.setState({isTopSolid: true});
    } else {
      this.setState({isTopSolid: false});
    }
  }

  renderRoutes(routes: any[], siteTitle: string): JSX.Element[] {
    return routes.map((route) => <GothamRoute key={route.path} siteTitle={siteTitle} {...route} />);
  }

  render(): JSX.Element {
    const {classes, routes, siteTitle, title} = this.props;
    const {isTopSolid} = this.state;

    return (
      <React.Fragment>
        <TopBar transparent={!isTopSolid} title={title} />
        <div className={classes.content}>
          {this.renderRoutes(routes, siteTitle)}
        </div>
      </React.Fragment>
    );
  }
}

export const DefaultContainer = withStyles(styles, {withTheme: true})(DefaultContainerBase);
