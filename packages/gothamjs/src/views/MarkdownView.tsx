/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {StyleRulesCallback} from '@material-ui/core/styles';
import * as React from 'react';

import {MarkdownActions} from '../actions/MarkdownActions';
import {AppConstants} from '../constants/AppConstants';
import {MarkdownViewProps, MarkdownViewState} from '../types/views/markdown';
import {initComponent} from '../utils/components';

const styles: StyleRulesCallback = (theme) => ({
  markdown: {
    marginBottom: 150,
    paddingLeft: 15,
    paddingRight: 15
  },
  toolbar: theme.mixins.toolbar
});

export class MarkdownViewBase extends React.Component<MarkdownViewProps, MarkdownViewState> {
  constructor(props: MarkdownViewProps) {
    super(props);

    // Methods
    this.onUpdate = this.onUpdate.bind(this);

    // Initial state
    this.state = {
      content: ''
    };
  }

  shouldComponentUpdate() {
    const {content = ''} = this.state;
    return content === '';
  }

  componentDidMount() {
    const {Flux} = this.props;

    // Add Listener
    Flux.on(AppConstants.GET_EXTERNAL, this.onUpdate);

    // Get external content
    const {external} = this.props;
    const {content = ''} = this.state;

    if(content === '') {
      MarkdownActions.getExternal(external);
    }
  }

  componentWillUnmount() {
    const {Flux} = this.props;

    // Remove Listener
    Flux.off(AppConstants.GET_EXTERNAL, this.onUpdate);
  }

  onUpdate(data): void {
    const {content} = data;
    this.setState({content});
  }

  render(): JSX.Element {
    const {classes} = this.props;
    const {content} = this.state;
    return (
      <div className={classes.markdown}>
        <div className={classes.toolbar} />
        {content}
      </div>
    );
  }
}

export const MarkdownView = initComponent(module, MarkdownViewBase, styles);
export default MarkdownView;
