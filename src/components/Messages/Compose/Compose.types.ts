import {NewMessageType} from '../Messenger/Messenger.types';

export interface ComposeProps {
  readonly convoId: string;
  readonly onCompose: (message: NewMessageType) => any;
  readonly rightItems: JSX.Element[];
  readonly userId: string;
}
export interface ComposeState {
  readonly content: string;
}
