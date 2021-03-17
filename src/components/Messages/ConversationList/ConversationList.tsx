import './ConversationList.css';

import React, {useFluxListener, useState} from '@nlabs/arkhamjs-utils-react';

import {MessageConstants} from '../../../constants/MessageConstants';
import {ConversationListItem} from '../ConversationListItem/ConversationListItem';
import {ConversationSearch} from '../ConversationSearch/ConversationSearch';
import {ConversationType, MessageType} from '../Messenger';
import {Toolbar} from '../Toolbar/Toolbar';
import {ToolbarButton} from '../ToolbarButton/ToolbarButton';


export const onError = ({error}) => {
  console.log('ConversationList::onError', error);
};

export const onSuccess = (setState) => ({list}) => {
  setState({conversations: list});
};

export const renderConversations = (props, conversations): JSX.Element[] => {
  const {onGetMessages} = props;

  return conversations.map((conversation) => (
    <ConversationListItem
      conversation={conversation}
      key={conversation.name}
      onClick={onGetMessages} />
  ));
};

export interface ConversationListProps {
  readonly conversations: ConversationType[];
  readonly onGetMessages: (convoId: string) => Promise<MessageType[]>;
}

export const ConversationList = (props: ConversationListProps) => {
  const {conversations: propConversations = []} = props;

  // Initial state
  const [state, setState] = useState({
    conversations: propConversations
  });
  const {conversations} = state;

  useFluxListener(MessageConstants.CONVO_LIST_FAILED, onError);
  useFluxListener(MessageConstants.CONVO_LIST_SUCCESS, onSuccess(setState));

  return (
    <div className="conversation-list">
      <Toolbar
        title="Messenger"
        leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={[<ToolbarButton key="add" icon="ion-ios-add-circle-outline" />]} />
      <ConversationSearch />
      {renderConversations(props, conversations)}
    </div>
  );
};

export default ConversationList;
