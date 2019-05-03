import {ConversationType, MessageType} from '../Messenger/Messenger.types';

export interface ConversationListItemProps {
  readonly conversation: ConversationType;
  readonly onClick: (convoId: string) => Promise<MessageType[]>;
}

export interface ConversationListItemState {

}
