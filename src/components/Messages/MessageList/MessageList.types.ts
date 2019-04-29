import {MessageType, NewMessageType} from '../Messenger/Messenger.types';

export interface MessageListProps {
  readonly onCompose: (message: NewMessageType) => any;
  readonly userId: string;
}

export interface MessageListState {
  readonly convoId: string;
  readonly messages: MessageType[];
}
