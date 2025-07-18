import {Transition} from '@headlessui/react';
import {useFluxListener} from '@nlabs/arkhamjs-utils-react';
import {cn} from '@nlabs/utils';
import {Fragment, useEffect, useState} from 'react';

import {GothamConstants} from '../../constants/GothamConstants.js';
import {Svg} from '../Svg/Svg.js';

import type {ReactElement} from 'react';

export interface GothamNotifyAction {
  readonly icon?: string;
  readonly label?: string;
  readonly onClick: (key: string) => void;
}

export type GothamSeverity = 'error' | 'info' | 'success' | 'warning';

export interface GothamNotifyParams {
  readonly actions?: GothamNotifyAction[];
  readonly anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  readonly autoHideDuration?: number;
  readonly message?: ReactElement | string;
  readonly severity?: GothamSeverity;
}

// Custom Button component
const Button = ({children, onClick, className = ''}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm',
      'text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
      className
    )}
  >
    {children}
  </button>
);

// Custom IconButton component
const IconButton = ({children, onClick, className = ''}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
      className
    )}
  >
    {children}
  </button>
);

// Custom Alert component
const Alert = ({children, severity, onClose}) => {
  const bgColors = {
    error: 'bg-red-500',
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500'
  };

  return (
    <div className={cn(
      'rounded-md p-4 w-full flex items-center justify-between',
      bgColors[severity] || 'bg-gray-500',
      'text-white'
    )}>
      <div>{children}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-auto -mx-1.5 -my-1.5 rounded-md p-1.5 inline-flex text-white hover:bg-opacity-20 hover:bg-black focus:outline-none focus:ring-2 focus:ring-white"
        >
          <span className="sr-only">Dismiss</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export const Notify = () => {
  const [isOpen, setOpen] = useState(false);
  const [notification, setNotification] = useState<GothamNotifyParams>({});
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const notifyClose = () => setOpen(false);

  useEffect(() => {
    if (isOpen && notification.autoHideDuration) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const id = setTimeout(() => {
        setOpen(false);
      }, notification.autoHideDuration);

      setTimeoutId(id);

      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }

    return undefined;
  }, [isOpen, notification.autoHideDuration]);

  const notifyOpen = ({
    actions = [],
    autoHideDuration = 3000,
    message,
    severity,
    anchorOrigin = { horizontal: 'left', vertical: 'bottom' },
    ...restProps
  }: GothamNotifyParams) => {
    let action;

    if(actions.length) {
      action = (key: string) => (
        <div className="flex space-x-2">
          {actions.map(({icon, label, onClick}, index) => (
            <Fragment key={index}>
              {icon ? (
                <IconButton onClick={() => onClick(key)}>
                  <Svg color="inherit" height={24} name={icon} width={24} />
                </IconButton>
              ) : (
                <Button onClick={() => onClick(key)}>{label}</Button>
              )}
            </Fragment>
          ))}
        </div>
      );
    }

    setNotification({
      ...restProps,
      actions: [action as GothamNotifyAction],
      anchorOrigin,
      autoHideDuration,
      message: severity ? (
        <Alert
          onClose={notifyClose}
          severity={severity}
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

  const positionClasses = (() => {
    const {horizontal = 'left', vertical = 'bottom'} = notification.anchorOrigin || {};

    const positions = {
      bottom: {
        center: 'bottom-4 left-1/2 transform -translate-x-1/2',
        left: 'bottom-4 left-4',
        right: 'bottom-4 right-4'
      },
      top: {
        center: 'top-4 left-1/2 transform -translate-x-1/2',
        left: 'top-4 left-4',
        right: 'top-4 right-4'
      }
    };

    return positions[vertical][horizontal];
  })();

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={cn(
        'fixed z-50 max-w-sm w-full shadow-lg rounded-lg pointer-events-auto overflow-hidden',
        positionClasses
      )}>
        <div className="ring-1 ring-black ring-opacity-5 bg-white">
          {!notification.severity ? (
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-1">
                  {notification.message}
                </div>
                {notification.actions?.length && (
                  <div className="ml-4 flex-shrink-0 flex">
                    {notification.actions.map(({icon, label, onClick}, index) => (
                      <Fragment key={index}>
                        {icon ? (
                          <IconButton onClick={() => onClick('notification')}>
                            <Svg color="inherit" height={24} name={icon} width={24} />
                          </IconButton>
                        ) : (
                          <Button onClick={() => onClick('notification')}>{label}</Button>
                        )}
                      </Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              {notification.message as ReactElement}
            </div>
          )}
        </div>
      </div>
    </Transition>
  );
};
