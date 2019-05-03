import {ConversationType, MessageType} from '../Messenger/Messenger.types';

export interface ConversationListProps {
  readonly conversations: ConversationType[];
  readonly onGetMessages: (convoId: string) => Promise<MessageType[]>;
}

export interface ConversationListState {
  readonly conversations: ConversationType[];
}
