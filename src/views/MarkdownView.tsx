import {StyleRulesCallback} from '@material-ui/core/styles';
import {Flux} from '@nlabs/arkhamjs';
import * as React from 'react';
import remark from 'remark';
import remarkReact from 'remark-react';

import {AppActions} from '../actions/AppActions';
import {AppConstants} from '../constants/AppConstants';
import {MarkdownViewProps, MarkdownViewState} from '../types/views/markdown';
import {initComponent} from '../utils/components';

const styles: StyleRulesCallback = (theme) => ({
  markdown: {
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
    // Add Listener
    Flux.on(AppConstants.GET_EXTERNAL, this.onUpdate);

    // Get external content
    const {external} = this.props;
    const {content = ''} = this.state;

    if(content === '') {
      AppActions.getExternal(external);
    }
  }

  componentWillUnmount() {
    // Remove Listener
    Flux.off(AppConstants.GET_EXTERNAL, this.onUpdate);
  }

  onUpdate(data): void {
    const {content} = data;
    const renderedContent = remark().use(remarkReact)
      .processSync(content).contents;
    this.setState({content: renderedContent});
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
