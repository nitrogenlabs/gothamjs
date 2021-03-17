import './Compose.css';

import React from 'react';

import {Form} from '../../Form';
import {NewMessageType} from '../Messenger';

// import {useState} from '@nlabs/arkhamjs-utils-react';
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

export interface ComposeProps {
  readonly convoId: string;
  readonly onCompose: (message: NewMessageType) => any;
  readonly rightItems: JSX.Element[];
  readonly userId: string;
}

export const Compose = (props: ComposeProps) => {
  const {rightItems} = props;

  // Initial state
  // const [state, setState] = useState({
  //   content: ''
  // });
  // const {content} = state;
  const content = '';

  return (
    <div className="compose">
      <Form
        onSubmit={null}
        // onChange={() => onChange(setState)}
        defaultValues={content}>
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
