/**
 * Copyright (c) 2020-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {DateTime} from 'luxon';
import React from 'react';

const useStyles: any = makeStyles((theme: any) => ({
  dayPlaceholder: {
    borderColor: 'transparent',
    borderWidth: 1,
    flex: 1,
    margin: 5,
    padding: 5
  },
  invalidInput: {
    color: theme.palette.neutral.main
  },
  selectedDay: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    fontWeight: 700
  },
  unselectedDay: {
    color: theme.palette.primary.dark
  },
  weekDay: {
    borderColor: 'transparent',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    cursor: 'pointer',
    flex: 1,
    fontSize: 14,
    margin: 5,
    minWidth: 32,
    textAlign: 'center',
    '&:hover': {
      color: theme.palette.primary.main,
      borderColor: theme.palette.neutral.light,
      fontWeight: 700
    }
  }
}));

export const isDayInvalid = (date: DateTime, selectedDate: DateTime, minDate: DateTime, maxDate: DateTime) =>
  (minDate && date.diff(minDate, 'days').days > 0) || (maxDate && date.diff(maxDate, 'days').days < 0);

export interface WeekProps {
  readonly date: DateTime;
  readonly dateDisabled: (date: DateTime) => any;
  readonly maxDate: DateTime;
  readonly minDate: DateTime;
  readonly onSelectDate: (event: React.MouseEvent<HTMLElement>, date: DateTime) => any;
  readonly selectedDate: DateTime;
}

export const Week = (props: WeekProps) => {
  const {date, dateDisabled, maxDate, minDate, onSelectDate, selectedDate} = props;
  const classes: any = useStyles();

  if(!date) {
    return <div className={classes.dayPlaceholder} />;
  }

  const isSame: boolean = date.diff(selectedDate, 'days').days === 0;
  const disabled: boolean = isDayInvalid(date, selectedDate, minDate, maxDate) || (dateDisabled && dateDisabled(date));
  const buttonCls: string = clsx({
    [classes.selectedDay]: isSame,
    [classes.unselectedDay]: !isSame,
    [classes.invalidInput]: disabled
  }, classes.weekDay);
  const onSelect = (event) => {
    console.log('onSelect::date', disabled, date);
    if(!disabled) {
      onSelectDate(event, date);
    }
  };

  return (<div className={buttonCls} onClick={onSelect}>{date.day}</div>);
};
