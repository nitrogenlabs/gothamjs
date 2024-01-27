/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {useFluxListener, useState} from '@nlabs/arkhamjs-utils-react';
import {useEffect} from 'react';

import {MarkdownActions} from '../actions/MarkdownActions';
import {GothamConstants} from '../constants/GothamConstants';
import {PageViewProps} from './PageView';
import {ToolbarSpacer} from '../components/ToolbarSpacer';

export interface MarkdownViewProps extends PageViewProps {
  readonly external?: string;
}

export const onUpdate = (setState) => (data): void => {
  const {content} = data;
  setState({content});
};

export const MarkdownView = (props: MarkdownViewProps) => {
  const {external} = props;
  const [state, setState] = useState({
    content: ''
  });
  const {content = ''} = state;

  useFluxListener(GothamConstants.GET_EXTERNAL, onUpdate(setState));

  useEffect(() => {
    if(content === '') {
      MarkdownActions.getExternal(external);
    }
  }, [content]);

  return (
    <div className="pl3 pr3 mb6">
      <ToolbarSpacer />
      {content}
    </div>
  );
};

export default MarkdownView;
