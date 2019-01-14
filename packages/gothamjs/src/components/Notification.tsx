import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {StyleRulesCallback, withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  AlertCircleOutline as ErrorIcon,
  AlertOutline as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  InformationOutline as InfoIcon
} from 'mdi-material-ui';
import React from 'react';

import {NotificationProps} from '../types/components/notification';

const styles: StyleRulesCallback = (theme) => ({
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
    marginRight: theme.spacing.unit,
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
});

const variantIcon = {
  error: ErrorIcon,
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon
};

export const NotificationBase = (props: NotificationProps): JSX.Element => {
  const {classes, className, message, onClose, variant, ...other} = props;
  const Icon = variantIcon[variant];
  const notifyIcon = Icon && <Icon className={classNames(classes.icon, classes.iconVariant)} />;
  const notifyClass = classes[variant] || classes.default;

  return (
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
          onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other} />
  );
};

export const Notification = withStyles(styles)(NotificationBase);
