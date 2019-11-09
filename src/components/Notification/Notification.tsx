/**
 * Copyright (c) 2019-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Snackbar} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {makeStyles} from '@material-ui/styles';
import {useFlux} from '@nlabs/arkhamjs-utils-react';
import {createHash} from '@nlabs/utils';
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
import {NotificationParams, NotificationProps} from './Notification.types';

const useStyles: any = makeStyles((theme: any) => ({
  close: {
    padding: theme.spacing(1)
  },
  default: {
    backgroundColor: theme.palette.neutral.dark,
    color: theme.palette.neutral.light
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.error.light
  },
  icon: {
    fontSize: 20
  },
  iconStatus: {
    marginRight: theme.spacing(1),
    opacity: 0.9
  },
  info: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.info.light
  },
  message: {
    alignItems: 'center',
    display: 'flex'
  },
  notification: {
    flexDirection: 'row'
  },
  success: {
    backgroundColor: theme.palette.success.dark,
    color: theme.palette.success.light
  },
  warning: {
    backgroundColor: theme.palette.warning.dark,
    color: theme.palette.warning.light
  }
}));

const statusIcon = {
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

export const addNotification = (notifications, setHasNotification, setNotifications, setCurrent) => {
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
  const {className, ...other} = props;
  const defaultId: string = createHash('notification');
  const defaultNotification: NotificationParams = {hideDuration: null, id: defaultId, message: '', status: 'default'};
  const [currentNotification, setCurrent] = useState(defaultNotification);
  const [hasNotification, setHasNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);

  if(!currentNotification) {
    return null;
  }

  const {hideDuration, id, message, status} = currentNotification;
  const classes = useStyles();
  const Icon = statusIcon[status];
  const notifyIcon = Icon && <Icon className={classNames(classes.icon, classes.iconStatus)} />;
  const notifyClass = classes[status] || classes.default;

  useFlux([
    {
      handler: ({notification}) =>
        addNotification([...notifications, notification], setHasNotification, setNotifications, setCurrent),
      type: GothamConstants.NOTIFY
    }
  ]);

  return (
    <Snackbar
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          className={classes.close}
          color="inherit"
          onClick={(event) => onNotificationClose(setHasNotification, event)}>
          <CloseIcon />
        </IconButton>
      ]}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      autoHideDuration={hideDuration}
      key={id}
      message={<span id="message-id">{message}</span>}
      onClose={(event) => onNotificationClose(setHasNotification, event)}
      onExited={() => onNotificationExit(notifications, setHasNotification, setNotifications, setCurrent)}
      open={hasNotification}
      ContentProps={{'aria-describedby': 'message-id'}}>
      <SnackbarContent
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
        aria-describedby="client-snackbar"
        classes={{root: classNames(classes.notification, notifyClass, className)}}
        message={
          <span id="client-snackbar" className={classes.message}>
            {notifyIcon}
            {message}
          </span>
        }
        {...other} />
    </Snackbar>
  );
};
