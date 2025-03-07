
import Alert from '@mui/material/Alert/Alert';
import Button from '@mui/material/Button/Button';
import IconButton from '@mui/material/IconButton/IconButton';
import Slide from '@mui/material/Slide';
import Snackbar, {SnackbarProps} from '@mui/material/Snackbar';
import {useFluxListener} from '@nlabs/arkhamjs-utils-react';
import {useState} from 'react';

import {GothamConstants} from '../../constants/GothamConstants';
import {Svg} from '../Svg/Svg';

import type {ReactElement} from 'react';

export const TransitionUp = (props) => <Slide {...props} direction="up" />;

export interface GothamNotifyAction {
  readonly icon?: string;
  readonly label?: string;
  readonly onClick: (key: string) => void;
}

export type GothamSeverity = 'error' | 'info' | 'success' | 'warning';

export interface GothamNotifyParams extends SnackbarProps {
  readonly actions?: GothamNotifyAction[];
  readonly severity?: GothamSeverity;
}

export const Notify = () => {
  const [isOpen, setOpen] = useState(false);
  const [notification, setNotification] = useState<GothamNotifyParams>({});
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
      message: severity ? (
        <Alert
          onClose={notifyClose}
          severity={severity}
          sx={{width: '100%'}}
          variant="filled"
        >
          {message}
        </Alert>
      ) : message,
      severity
    });
    setOpen(true);
  };

  useFluxListener(GothamConstants.NOTIFY_OPEN, notifyOpen);
  useFluxListener(GothamConstants.NOTIFY_CLOSE, notifyClose);

  return (
    !notification.severity
      ? (
        <Snackbar
          {...notification}
          open={isOpen}
          onClose={notifyClose}
          TransitionComponent={TransitionUp}
        />
      )
      : (
        <Snackbar
          {...notification}
          open={isOpen}
          onClose={notifyClose}
          TransitionComponent={TransitionUp}
        >
          {notification.message as ReactElement}
        </Snackbar>
      )
  );
};
