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
