import React from 'react';

import {ConversationType, MessageType} from '../Messenger';

// import shave from 'shave';

export interface ConversationListItemProps {
  readonly conversation: ConversationType;
  readonly onClick: (convoId: string) => Promise<MessageType[]>;
}

export const ConversationListItem = (props: ConversationListItemProps) => {
  const {conversation, onClick} = props;
  const {convoId, photo, name, content} = conversation;

  // useEffect(() => shave('.conversation-snippet', 20), []);

  return (
    <div onClick={() => onClick(convoId)}>
      <div className="conversation-list-item">
        <img className="conversation-photo" src={photo} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{name}</h1>
          <p className="conversation-snippet">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ConversationListItem;
