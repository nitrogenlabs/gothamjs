import {Button, IconButton} from '@material-ui/core';
import {useFluxListener} from '@nlabs/arkhamjs-utils-react';
import {useSnackbar} from 'notistack';
import React from 'react';

import {GothamConstants} from '../constants/GothamConstants';
import {Svg} from './Svg';

export interface GothamNotifyAction {
  readonly icon?: string;
  readonly label?: string;
  readonly onClick: (key) => any;
}

export interface GothamNotifyParams {
  readonly actions?: GothamNotifyAction[];
  readonly autoHideDuration?: number;
  readonly key: string;
  readonly message: string;
  readonly persist?: boolean;
  readonly variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
}

export const Notify = () => {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const notifyOpen = ({
    actions = [],
    autoHideDuration = 3000,
    key,
    message,
    persist = false,
    variant = 'default'
  }: GothamNotifyParams) => {
    let action;

    if(actions.length) {
      action = (key) => (
        <>{actions.map(({icon, label, onClick}) => (icon
          ? (
            <IconButton onClick={() => onClick(key)}>
              <Svg color="#fff" height={24} name={icon} width={24} />
            </IconButton>
          )
          : (<Button onClick={() => onClick(key)}>{label}</Button>)))}
        </>
      );
    }

    enqueueSnackbar(message, {action, autoHideDuration, key, persist, variant});
  };

  const notifyClose = ({key}) => closeSnackbar(key);

  useFluxListener(GothamConstants.NOTIFY_OPEN, notifyOpen);
  useFluxListener(GothamConstants.NOTIFY_CLOSE, notifyClose);

  return null;
};
