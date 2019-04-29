import {MessageType} from '../Messenger/Messenger.types';

export interface MessageProps {
  readonly endsSequence: any;
  readonly isMine: boolean;
  readonly message: MessageType;
  readonly showTimestamp: boolean;
  readonly startsSequence: any;
}
