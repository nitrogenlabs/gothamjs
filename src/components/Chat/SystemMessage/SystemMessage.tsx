import clsx from 'clsx';

import './SystemMessage.css';

import type {FC} from 'react';
import type {ISystemMessageProps} from '../type';

export const SystemMessage: FC<ISystemMessageProps> = (props) => (
  <div className={clsx('rce-container-smsg', props.className)}>
    <div className='rce-smsg'>
      <div className='rce-smsg-text'>{props.text}</div>
    </div>
  </div>
);
