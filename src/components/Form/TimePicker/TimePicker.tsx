/**
 * Copyright (c) 2020-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText, {FormHelperTextProps} from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Input, {InputProps} from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel, {InputLabelProps} from '@material-ui/core/InputLabel';
import Popover from '@material-ui/core/Popover';
import {makeStyles, StyledComponentProps} from '@material-ui/core/styles';
import AccessTime from '@material-ui/icons/AccessTime';
import {DateTime} from 'luxon';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {DatePickerOrigin} from '../DatePicker/DatePicker';
import {Clock, ClockProps} from './Clock';

const useStyles: any = makeStyles({
  formControl: {
    cursor: 'pointer'
  },
  input: {
    height: '19px',
    maxWidth: '100%',
    overflow: 'hidden',
    padding: '6px 0 7px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '180px'
  },
  label: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

export const handleWindowClick = (inputElement, clockElement, closeClock) => (event: MouseEvent) => {
  if([inputElement, clockElement].reduce((contain, next) =>
    contain && (!next || next.compareDocumentPosition(event.target as Node) < 16), true)) {
    closeClock();
  }
};

export interface TimePickerProps extends React.Props<{}>, StyledComponentProps {
  readonly anchorOrigin?: DatePickerOrigin;
  readonly className?: string;
  readonly clockProps?: ClockProps;
  readonly dialog?: boolean;
  readonly disabled?: boolean;
  readonly endIcon?: Node;
  readonly error?: string;
  readonly formHelperTextProps?: FormHelperTextProps;
  readonly fullWidth?: boolean;
  readonly inputLabelProps?: InputLabelProps;
  readonly inputProps?: InputProps;
  readonly label?: string;
  readonly name: string;
  readonly onChange: (value: Date, event?: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => void;
  readonly selectableMinutesInterval?: number;
  readonly transformOrigin?: DatePickerOrigin;
  readonly value: Date;
}

export const TimePicker = (props: TimePickerProps): JSX.Element => {
  const {
    anchorOrigin,
    className,
    clockProps,
    dialog,
    disabled,
    endIcon,
    error,
    inputLabelProps,
    inputProps,
    formHelperTextProps,
    label,
    name,
    onChange,
    selectableMinutesInterval,
    transformOrigin,
    value
  } = props;
  const classes = useStyles();

  // References
  const inputRef = useRef();
  const clockRef = useRef();

  // Initial state
  const [clockShow, setClockShow] = useState(false);
  const [focus, setFocus] = useState(false);

  // Methods
  const closeClock = useCallback(() => setClockShow(false), []);
  const onWindowClick = useCallback(
    (event: MouseEvent) => handleWindowClick(inputRef.current, clockRef.current, closeClock)(event),
    [inputRef.current, clockRef.current, closeClock]
  );
  const onFocus = useCallback((focus: boolean) => setFocus(focus), []);
  const toggleShowClock = useCallback(() => setClockShow(!clockShow), []);

  // Vars
  const defaultResize: any = () => { };
  const [onClickResize, setClockResize] = useState(defaultResize);

  // On mount
  useEffect(() => {
    window.addEventListener('click', onWindowClick);

    return () => {
      window.removeEventListener('click', onWindowClick);
    };
  }, []);

  return (
    <>
      <div key='date-input' className={className} ref={inputRef}>
        <FormControl
          className={classes.formControl}
          disabled={disabled}
          error={error !== undefined}
          fullWidth
          onClick={toggleShowClock}>
          {label && <InputLabel shrink={focus || clockShow || value !== undefined} htmlFor={name}
            {...{
              ...inputLabelProps,
              classes: inputLabelProps && inputLabelProps.classes ? {
                root: classes.label,
                ...inputLabelProps.classes
              } : {root: classes.label}
            }}>
            {label}
          </InputLabel>}
          <Input
            name={name}
            value={value ? DateTime.fromJSDate(value).toFormat('h:mm a') : '\u00a0'}
            onFocus={() => onFocus(true)}
            onBlur={() => onFocus(false)}
            inputComponent={({value}) => <div className={classes.input}>{value}</div>}
            endAdornment={<InputAdornment position='end'>
              <IconButton onMouseDown={(event) => event.preventDefault()}>
                {endIcon ? endIcon : <AccessTime />}
              </IconButton>
            </InputAdornment>}
            {...inputProps} />
          {error && <FormHelperText error {...formHelperTextProps}>{error}</FormHelperText>}
        </FormControl>
      </div>
      {dialog
        ? (
          <Dialog key='date-dialog' open={clockShow} onClose={closeClock}>
            <Clock
              ref={clockRef}
              onSelect={onChange}
              selectableMinutesInterval={selectableMinutesInterval}
              onClose={closeClock}
              value={value}
              {...clockProps} />
          </Dialog>
        )
        : (
          <Popover
            key='date-popover'
            open={clockShow}
            onEntered={() => {
              if(onClickResize) {
                onClickResize();
              }
            }}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            anchorEl={inputRef.current}>
            <Clock
              onClose={closeClock}
              onSelect={onChange}
              ref={clockRef}
              selectableMinutesInterval={selectableMinutesInterval}
              setClockResize={setClockResize}
              value={value}
              {...clockProps} />
          </Popover>
        )}
    </>
  );
};
