import './Message.css';

import {DateTime} from 'luxon';
import React from 'react';

import {MessageProps} from './Message.types';

export const Message = (props: MessageProps) => {
  const {
    endsSequence,
    isMine,
    message,
    showTimestamp,
    startsSequence
  } = props;

  const friendlyTimestamp: string = DateTime.local(message.added).toFormat('ccc, LLL d, yyyy t');

  return (
    <div className={[
      'message',
      `${isMine ? 'mine' : ''}`,
      `${startsSequence ? 'start' : ''}`,
      `${endsSequence ? 'end' : ''}`
    ].join(' ')}>
      {
        showTimestamp &&
        <div className="timestamp">
          {friendlyTimestamp}
        </div>
      }

      <div className="bubble-container">
        <div className="bubble" title={friendlyTimestamp}>
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default Message;
