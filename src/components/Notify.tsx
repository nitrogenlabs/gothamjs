import Alert from '@material-ui/core/Alert/Alert';
import Button from '@material-ui/core/Button/Button';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Slide from '@material-ui/core/Slide';
import Snackbar, {SnackbarProps} from '@material-ui/core/Snackbar';
import {useFluxListener} from '@nlabs/arkhamjs-utils-react';
import React, {useState} from 'react';

import {GothamConstants} from '../constants/GothamConstants';
import {Svg} from './Svg';

export const TransitionUp = (props) => <Slide {...props} direction="up" />;

export interface GothamNotifyAction {
  readonly icon?: string;
  readonly label?: string;
  readonly onClick: (key) => any;
}

export interface GothamNotifyParams extends SnackbarProps {
  readonly actions?: GothamNotifyAction[];
  readonly severity?: 'error' | 'info' | 'success' | 'warning'
}

export const Notify = () => {
  const [isOpen, setOpen] = useState(false);
  const [notification, setNotification] = useState({});
  const notifyClose = () => setOpen(false);
  const notifyOpen = ({
    actions = [],
    autoHideDuration = 3000,
    message,
    severity,
    ...restProps
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

    setNotification({
      ...restProps,
      action,
      autoHideDuration,
      message: severity ? (
        <Alert onClose={notifyClose} severity="success" sx={{width: '100%'}}>{message}</Alert>
      ) : message
    });
    setOpen(true);
  };

  useFluxListener(GothamConstants.NOTIFY_OPEN, notifyOpen);
  useFluxListener(GothamConstants.NOTIFY_CLOSE, notifyClose);

  return (
    <Snackbar
      {...notification}
      open={isOpen}
      onClose={notifyClose}
      TransitionComponent={TransitionUp}
    />
  );
};
