import './Messenger.css';

import {Flux} from '@nlabs/arkhamjs';
import React from 'react';

import {MessageConstants} from '../../../constants/MessageConstants';
import {ConversationList} from '../ConversationList/ConversationList';
import {MessageList} from '../MessageList/MessageList';
import {Toolbar} from '../Toolbar/Toolbar';
import {ToolbarButton} from '../ToolbarButton/ToolbarButton';
import {MessageType, MessengerProps} from './Messenger.types';

export const getMessages = (props) => async (convoId: string): Promise<MessageType[]> => {
  const {onGetMessages} = props;
  const messages = await onGetMessages(convoId);
  await Flux.dispatch({messages, type: MessageConstants.GET_LIST_SUCCESS});
  return messages;
};

export const Messenger = (props: MessengerProps) => {
  const {conversations, onCompose, userId} = props;

  return (
    <div className="messenger">
      <Toolbar
        title="Messenger"
        leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={[<ToolbarButton key="add" icon="ion-ios-add-circle-outline" />]} />

      <Toolbar
        title="Conversation Title"
        rightItems={[
          <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
          <ToolbarButton key="video" icon="ion-ios-videocam" />,
          <ToolbarButton key="phone" icon="ion-ios-call" />
        ]} />

      <div className="scrollable sidebar">
        <ConversationList
          conversations={conversations}
          onGetMessages={getMessages(props)} />
      </div>

      <div className="scrollable content">
        <MessageList onCompose={onCompose} userId={userId} />
      </div>
    </div>
  );
};

export default Messenger;
