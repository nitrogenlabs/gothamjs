import './MessageList.css';

import {useFlux, useState} from '@nlabs/arkhamjs-utils-react';
import {DateTime} from 'luxon';
import React from 'react';

import {MessageConstants} from '../../../constants/MessageConstants';
import {Compose} from '../Compose/Compose';
import {Message} from '../Message/Message';
import {MessageType} from '../Messenger/Messenger.types';
import {Toolbar} from '../Toolbar/Toolbar';
import {ToolbarButton} from '../ToolbarButton/ToolbarButton';
import {MessageListProps} from './MessageList.types';


export const onError = ({error}) => {
  console.log('MessageList::onError', error);
};

export const onSuccess = (setState) => ({convoId, list}) => {
  setState({convoId, messages: list});
};

export const renderMessages = (props, state) => {
  let index = 0;
  const {userId} = props;
  const {messages} = state;
  const messageCount: number = messages.length;
  const renderedMessages: JSX.Element[] = [];

  while(index < messageCount) {
    const previous: MessageType = messages[index - 1];
    const current: MessageType = messages[index];
    const next: MessageType = messages[index + 1];
    const isMine: boolean = current.userId === userId;
    const currentDate: DateTime = DateTime.local(current.added);
    let prevBySameId: boolean = false;
    let nextBySameId: boolean = false;
    let startsSequence: boolean = true;
    let endsSequence: boolean = true;
    let showTimestamp: boolean = true;

    if(previous) {
      const previousDate: DateTime = DateTime.local(previous.added);
      const previousDuration: number = currentDate.diff(previousDate, ['hours']).hours;
      prevBySameId = previous.userId === current.userId;

      if(prevBySameId && (previousDuration < 1)) {
        startsSequence = false;
      }

      if(previousDuration < 1) {
        showTimestamp = false;
      }
    }

    if(next) {
      const nextDate: DateTime = DateTime.local(next.added);
      const nextDuration: number = nextDate.diff(currentDate, ['hours']).hours;
      nextBySameId = next.userId === current.userId;

      if(nextBySameId && (nextDuration < 1)) {
        endsSequence = false;
      }
    }

    renderedMessages.push(
      <Message
        endsSequence={endsSequence}
        isMine={isMine}
        key={`message-${index}`}
        message={current}
        showTimestamp={showTimestamp}
        startsSequence={startsSequence} />
    );

    // Proceed to the next message.
    index += 1;
  }

  return renderedMessages;
};

export const MessageList = (props: MessageListProps) => {
  const {onCompose, userId} = props;
  // Initial state
  const [state, setState] = useState({
    convoId: '',
    messages: []
  });
  const {convoId} = state;

  useFlux([
    {handler: onError, type: MessageConstants.GET_LIST_FAILED},
    {handler: onSuccess(setState), type: MessageConstants.GET_LIST_SUCCESS}
  ]);


  return (
    <div className="message-list">
      <Toolbar
        title="Conversation Title"
        rightItems={[
          <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
          <ToolbarButton key="video" icon="ion-ios-videocam" />,
          <ToolbarButton key="phone" icon="ion-ios-call" />
        ]}
      />

      <div className="message-list-container">{renderMessages(props, state)}</div>

      <Compose
        convoId={convoId}
        onCompose={onCompose}
        rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]}
        userId={userId} />
    </div>
  );
};

export default MessageList;
