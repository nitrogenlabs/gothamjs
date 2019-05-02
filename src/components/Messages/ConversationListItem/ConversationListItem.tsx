import './ConversationListItem.css';

import React, {useEffect} from 'react';
import shave from 'shave';

import {ConversationListItemProps} from './ConversationListItem.types';

export const ConversationListItem = (props: ConversationListItemProps) => {
  const {conversation, onClick} = props;
  const {convoId, photo, name, content} = conversation;

  useEffect(() => () => shave('.conversation-snippet', 20), []);

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
