/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {makeStyles} from '@material-ui/styles';
import {useFluxListener, useState} from '@nlabs/arkhamjs-utils-react';
import React, {useEffect} from 'react';

import {MarkdownActions} from '../actions/MarkdownActions';
import {Theme} from '../config/theme';
import {GothamConstants} from '../constants/GothamConstants';
import {PageViewProps} from './PageView';

export interface MarkdownViewProps extends PageViewProps {
  readonly external?: string;
}

const useStyles: any = makeStyles((theme: Theme) => ({
  markdown: {
    marginBottom: 150,
    paddingLeft: 15,
    paddingRight: 15
  },
  toolbar: theme.mixins.toolbar
}));

export const onUpdate = (setState) => (data): void => {
  const {content} = data;
  setState({content});
};

export const MarkdownView = (props: MarkdownViewProps) => {
  // Get external content
  const {external} = props;

  // Initial state
  const [state, setState] = useState({
    content: ''
  });
  const {content = ''} = state;
  const classes = useStyles();

  useFluxListener(GothamConstants.GET_EXTERNAL, onUpdate(setState));

  useEffect(() => {
    if(content === '') {
      MarkdownActions.getExternal(external);
    }
  }, [content]);

  return (
    <div className={classes.markdown}>
      <div className={classes.toolbar} />
      {content}
    </div>
  );
};

export default MarkdownView;
