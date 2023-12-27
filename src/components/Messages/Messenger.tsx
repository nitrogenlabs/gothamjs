/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import makeStyles from '@mui/styles/makeStyles';
import {useFluxDispatch} from '@nlabs/arkhamjs-utils-react/lib';
import clsx from 'clsx';
import React from 'react';

import {MessageConstants} from '../../constants/MessageConstants';
import {ConversationList} from './ConversationList/ConversationList';
import {MessageList} from './MessageList/MessageList';
import {Toolbar} from './Toolbar/Toolbar';
import {ToolbarButton} from './ToolbarButton/ToolbarButton';

const useStyles: any = makeStyles({
  messenger: {
    background: '#eeeef1',
    display: 'grid',
    gridTemplateColumns: '350px auto',
    gridTemplateRows: '60px auto 60px',
    gridColumnGap: 1,
    gridRowGap: 1,
    height: '100vh',
    width: '100%'
  },
  scrollable: {
    position: 'relative',
    overflowY: 'scroll',
    '-webkitOverflowScrolling': 'touch'
  },
  sidebar: {
    background: 'white',
    gridRowStart: 1,
    gridRowEnd: 'span 3'
  },

  content: {
    background: 'white',
    gridRowStart: 1,
    gridRowEnd: 'span 3'
  },
  footer: {
    gridColumnStart: 2,
    background: 'white'
  }
});

export const getMessages = (props) => async (convoId: string): Promise<MessageType[]> => {
  const {onGetMessages} = props;
  const messages = await onGetMessages(convoId);
  await useFluxDispatch(MessageConstants.GET_LIST_SUCCESS, {messages});
  return messages;
};

export interface MessengerProps {
  readonly conversations: ConversationType[];
  readonly onCompose: (message: NewMessageType) => any;
  readonly onGetMessages: (convoId: string) => Promise<any>;
  readonly userId: string;
}

export interface ConversationType {
  readonly content: string;
  readonly convoId: string;
  readonly name: string;
  readonly photo: string;
}

export interface MessageType {
  readonly added: number;
  readonly content: string;
  readonly msgId: string;
  readonly name: string;
  readonly userId: string;
}

export interface NewMessageType {
  readonly content: string;
  readonly convoId: string;
  readonly userId: string;
}

export const Messenger = (props: MessengerProps) => {
  const {conversations, onCompose, userId} = props;
  const classes = useStyles();

  return (
    <div className={classes.messenger}>
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

      <div className={clsx(classes.scrollable, classes.sidebar)}>
        <ConversationList
          conversations={conversations}
          onGetMessages={getMessages(props)} />
      </div>

      <div className={clsx(classes.scrollable, classes.content)}>
        <MessageList onCompose={onCompose} userId={userId} />
      </div>
    </div>
  );
};

export default Messenger;
