import './Compose.css';

import {useState} from '@nlabs/arkhamjs-utils-react';
import React from 'react';

import {Form} from '../../Form';
import {NewMessageType} from '../Messenger/Messenger.types';
import {ComposeProps} from './Compose.types';

export const onSubmit = (props) => ({values}) => {
  const {convoId, onCompose, userId} = props;

  if(onCompose) {
    const {content} = values;
    const message: NewMessageType = {
      content,
      convoId,
      userId
    };
    onCompose(message);
  }
};

export const onChange = (setState) => ({content}) => {
  setState({content});
};

export const Compose = (props: ComposeProps) => {
  const {rightItems} = props;

  // Initial state
  const [state, setState] = useState({
    content: ''
  });
  const {content} = state;


  return (
    <div className="compose">
      <Form
        initialValues={content}>
        <input
          name="content"
          type="text"
          className="compose-input"
          placeholder="Type a message, @name" />
      </Form>
      {rightItems}
    </div>
  );
};

export default Compose;
