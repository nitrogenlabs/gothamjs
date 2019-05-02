import './ConversationList.css';

import {useFlux, useState} from '@nlabs/arkhamjs-utils-react';
import React from 'react';

import {MessageConstants} from '../../../constants/MessageConstants';
import {ConversationListItem} from '../ConversationListItem/ConversationListItem';
import {ConversationSearch} from '../ConversationSearch/ConversationSearch';
import {Toolbar} from '../Toolbar/Toolbar';
import {ToolbarButton} from '../ToolbarButton/ToolbarButton';
import {ConversationListProps} from './ConversationList.types';


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

export const ConversationList = (props: ConversationListProps) => {
  const {conversations: propConversations = []} = props;

  // Initial state
  const [state, setState] = useState({
    conversations: propConversations
  });
  const {conversations} = state;

  useFlux([
    {handler: onError, type: MessageConstants.CONVO_LIST_FAILED},
    {handler: onSuccess(setState), type: MessageConstants.CONVO_LIST_SUCCESS}
  ]);

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
