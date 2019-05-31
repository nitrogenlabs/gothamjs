/**
 * Copyright (c) 2019-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Snackbar} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {makeStyles} from '@material-ui/styles';
import {useFlux} from '@nlabs/arkhamjs-utils-react';
import classNames from 'classnames';
import {
  AlertCircleOutline as ErrorIcon,
  AlertOutline as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  InformationOutline as InfoIcon
} from 'mdi-material-ui';
import React, {useState} from 'react';

import {GothamConstants} from '../../constants/GothamConstants';
import {NotificationProps} from './Notification.types';

const useStyles: any = makeStyles((theme: any) => ({
  close: {
    padding: theme.spacing(1)
  },
  default: {
    backgroundColor: '#f1f1f1'
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    marginRight: theme.spacing(1),
    opacity: 0.9
  },
  info: {
    backgroundColor: '#E4F8FF'
  },
  message: {
    alignItems: 'center',
    display: 'flex'
  },
  success: {
    backgroundColor: '#EEFFDC'
  },
  warning: {
    backgroundColor: '#FEFFDD'
  }
}));

const variantIcon = {
  error: ErrorIcon,
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon
};

export const processNotifications = (notifications, setHasNotification, setNotifications, setCurrent) => {
  if(notifications.length > 0) {
    setHasNotification(true);
    setCurrent(notifications.shift());
    setNotifications(notifications);
  }
};

export const addNotification = (notifications, setHasNotification, setNotifications, setCurrent) =>
  ({notification}) => {
    notifications.push(notification);
    setNotifications(notifications);
    processNotifications(notifications, setHasNotification, setNotifications, setCurrent);
  };

export const onNotificationClose = (setHasNotification, event: any, reason?: string) => {
  if(reason === 'clickaway') {
    return;
  }

  setHasNotification(false);
};

export const onNotificationExit = (notifications, setHasNotification, setNotifications, setCurrent) => {
  processNotifications(notifications, setHasNotification, setNotifications, setCurrent);
};

export const Notification = (props: NotificationProps): JSX.Element => {
  const {
    className,
    variant,
    ...other
  } = props;
  const [currentNotification, setCurrent] = useState({key: '', message: ''});
  const [hasNotification, setHasNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);

  if(!currentNotification) {
    return null;
  }

  const {key, message} = currentNotification;
  const classes = useStyles();
  const Icon = variantIcon[variant];
  const notifyIcon = Icon && <Icon className={classNames(classes.icon, classes.iconVariant)} />;
  const notifyClass = classes[variant] || classes.default;

  useFlux([
    {
      handler: addNotification(notifications, setHasNotification, setNotifications, setCurrent),
      type: GothamConstants.NOTIFY
    }
  ]);

  return (
    <Snackbar
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      autoHideDuration={10000}
      key={key}
      onClose={(event) => onNotificationClose(setHasNotification, event)}
      onExited={() => onNotificationExit(notifications, setHasNotification, setNotifications, setCurrent)}
      open={hasNotification}
      ContentProps={{'aria-describedby': 'message-id'}}
      message={<span id="message-id">{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          className={classes.close}
          color="inherit"
          onClick={(event) => onNotificationClose(setHasNotification, event)}>
          <CloseIcon />
        </IconButton>
      ]}>
      <SnackbarContent
        className={classNames(notifyClass, className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            {notifyIcon}
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={(event) => onNotificationClose(setHasNotification, event)}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
        {...other} />
    </Snackbar>
  );
};
