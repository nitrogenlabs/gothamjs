/**
 * Copyright (c) 2020-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Popover from '@material-ui/core/Popover';
import {makeStyles} from '@material-ui/core/styles';
import Today from '@material-ui/icons/Today';
import isEmpty from 'lodash/isEmpty';
import {DateTime} from 'luxon';
import React, {useCallback, useRef, useState} from 'react';

import {TimeSelect} from '../TimePicker/TimeSelect';
import {TimeSelectProps} from '../TimePicker/TimeSelect.types';
import {Calendar} from './Calendar/Calendar';
import {CalendarProps} from './Calendar/Calendar.types';
import {DatePickerProps} from './DatePicker.types';

const useStyles: any = makeStyles({
  formControl: {
    cursor: 'pointer'
  }
});

export const getSelectedDate = (minDate: DateTime, maxDate: DateTime): DateTime =>
  (value: string): DateTime => {
    const defaultDate: DateTime = DateTime.local().set({hours: 0, minutes: 0, seconds: 0, milliseconds: 0});
    const date: DateTime = !isEmpty(value) ? DateTime.fromMillis(value) : defaultDate;

    if(maxDate && date.diff(maxDate, 'days').days >= 0) {
      return maxDate;
    } else if(minDate && date.diff(minDate, 'days').days <= 0) {
      return minDate;
    }

    return date;
  };

export const handleToggleCalendar = (setCalendarShow) => (show: boolean) => setCalendarShow(show);

export const handleWindowClick = (inputRef, calendarRef, toggleCalendar) => (event: MouseEvent) => {
  const calendarElement = calendarRef.current;
  const inputElement = inputRef.current;

  if([inputElement, calendarElement].reduce(
    (contain, next) => contain && (!next || next.compareDocumentPosition(event.target as Node) < 16),
    true
  )) {
    toggleCalendar(false);
  }
};

export const DatePicker = (props: DatePickerProps) => {
  const {
    autoFocus,
    calendarProps,
    className,
    dateDisabled,
    dialog,
    disabled,
    endIcon,
    error,
    format,
    formHelperTextProps,
    label,
    max,
    min,
    name,
    onChange: onChangeCustom,
    onChangeInput,
    placeholder,
    timeInterval = 15,
    transformOrigin,
    type = 'date',
    use24Hour = false,
    value = DateTime.local().toMillis()
  } = props;
  const classes: any = useStyles();

  // Set default format base on type.
  let updatedFormat: string;

  if(!format) {
    switch(type) {
      case 'time':
        updatedFormat = use24Hour ? 'H:mm' : 'h:mm a';
        break;
      case 'datetime':
        updatedFormat = use24Hour ? 'EEE, LLL d, yyyy @ H:mm' : 'EEE, LLL d, yyyy @ h:mm a';
        break;
      default:
        updatedFormat = 'EEE, LLLL d, yyyy';
        break;
    }
  } else {
    updatedFormat = format;
  }

  // Parse string value into a DateTime object
  const minDate: DateTime = min ? DateTime.fromFormat(min, format) : undefined;
  const maxDate: DateTime = max ? DateTime.fromFormat(max, format) : undefined;
  const formatValue = useCallback(getSelectedDate(minDate, maxDate), [minDate, maxDate]);

  // States
  const [calendarShow, setCalendarShow] = useState(false);
  const [selectedDate, setSelected] = useState(formatValue(value));

  console.log('DatePicker::selectedDate', selectedDate.toFormat('EEE, LLL d, yyyy @ h:mm a'));
  // References
  const inputRef: any = useRef();
  const calendarRef: any = useRef();

  // Methods
  const toggleCalendar = handleToggleCalendar(setCalendarShow);

  const onChange = (event: any, date: DateTime) => {
    if(onChangeCustom) {
      onChangeCustom(event, date);
    }

    onChangeInput(event);
  };

  const updatedCalendarProps: CalendarProps = {
    dateDisabled,
    maxDate,
    minDate,
    onChange,
    onClose: () => toggleCalendar(false),
    selectedDate,
    setSelected,
    ...calendarProps
  };

  const updatedTimeProps: TimeSelectProps = {
    interval: timeInterval,
    maxDate,
    minDate,
    onChange,
    selectedDate,
    setSelected,
    use24Hour
  };

  const calendar: JSX.Element = <Calendar {...updatedCalendarProps} />;
  const time: JSX.Element = type === 'datetime' && <TimeSelect {...updatedTimeProps} />;

  const inputProps = {
    autoFocus,
    error,
    placeholder,
    value: selectedDate.toFormat(updatedFormat)
  };

  return (
    <>
      <div key='dateInput' className={className} ref={inputRef}>
        <FormControl
          className={classes.formControl}
          disabled={disabled}
          error={error !== undefined}
          fullWidth
          onClick={() => setCalendarShow(!calendarShow)} >
          {label && <InputLabel shrink htmlFor={name}>{label}</InputLabel>}
          <Input
            endAdornment={<InputAdornment position='end'>{endIcon ? endIcon : <Today />}</InputAdornment>}
            onClick={() => toggleCalendar(true)}
            {...inputProps}
            contentEditable={false}
            value={selectedDate.toFormat(updatedFormat)} />
          {error && <FormHelperText error {...formHelperTextProps}>{error}</FormHelperText>}
        </FormControl>
      </div>
      {dialog
        ? (
          <Dialog key='dateDialog' open={calendarShow} onClose={() => toggleCalendar}>
            <div ref={calendarRef}>
              {calendar}
              {time}
            </div>
          </Dialog>
        )
        : (
          <Popover
            anchorEl={inputRef.current}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            key='datePopover'
            onClose={() => toggleCalendar(false)}
            open={calendarShow}
            transformOrigin={transformOrigin} >
            <div ref={calendarRef}>
              {calendar}
              {time}
            </div>
          </Popover>
        )
      }
    </>
  );
};
