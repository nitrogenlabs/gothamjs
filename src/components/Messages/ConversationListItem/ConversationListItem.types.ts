import {ConversationType} from '../Messenger/Messenger.types';

export interface ConversationListItemProps {
  readonly conversation: ConversationType;
  readonly onClick: (convoId: string) => void;
}

export interface ConversationListItemState {

}
