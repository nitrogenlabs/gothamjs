/**
 * Copyright (c) 2020-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import SkipNext from '@material-ui/icons/SkipNext';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import {DateTime} from 'luxon';
import React, {useEffect, useState} from 'react';

import {Weeks} from './Weeks';


const useStyles: any = makeStyles((theme: any) => ({
  buttons: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0
  },
  calendarContainer: {
    marginBottom: theme.spacing(2)
  },
  calendarMonth: {
    color: theme.palette.primary.dark,
    fontSize: 16,
    fontWeight: 500
  },
  calendarYears: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  labelWeekDay: {
    color: theme.palette.neutral.main,
    fontWeight: 700,
    textAlign: 'center'
  },
  monthContainer: {
    maxWidth: 300
  },
  monthNavBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15
  }
}));

export const isPreviousValid = (selectedMonth: number, selectedYear: number, minDate: DateTime): boolean => {
  if(!minDate) {
    return true;
  }

  const {month: minMonth, year: minYear} = minDate;
  return selectedMonth > minMonth || selectedYear > minYear;
};

export const onPreviousMonth = (displayDate: DateTime, setDisplayDate: any) =>
  setDisplayDate(displayDate.minus({month: 1}));

export const onPreviousYear = (displayDate: DateTime, setDisplayDate: any) =>
  setDisplayDate(displayDate.minus({year: 1}));

export const isNextValid = (selectedMonth: number, selectedYear: number, maxDate: DateTime): boolean => {
  if(!maxDate) {
    return true;
  }

  const {month: maxMonth, year: maxYear} = maxDate;
  return selectedMonth < maxMonth || selectedYear < maxYear;
};

export const onNextMonth = (displayDate: DateTime, setDisplayDate: any) =>
  setDisplayDate(displayDate.plus({month: 1}));

export const onNextYear = (displayDate: DateTime, setDisplayDate: any) =>
  setDisplayDate(displayDate.plus({year: 1}));

export const selectDate = (displayDate, onClose, onChange, setSelected, setDisplayDate) =>
  (event: React.MouseEvent<HTMLElement>, date: DateTime) => {
    console.log('Month::selectDate::date', date.toFormat('H:mm'));
    // Update date user is actually viewing
    setSelected(date);
    onClose();

    console.log('Month::selectDate::onChange', onChange);
    if(onChange) {
      event.target = {value: date.toMillis()} as any;
      onChange(event, date);
    }
  };

export const getWeekdayIndex = (day: DateTime): number => {
  const {weekday} = day;
  return weekday === 7 ? 0 : weekday;
};

export const generateMonthCalendar = (selectedDate: DateTime): DateTime[][] => {
  const firstDay: DateTime = selectedDate.set({day: 1});
  const daysInWeekInMonth: DateTime[][] = [];

  console.log('generateMonthCalendar::firstDay', firstDay.toFormat('HH:mm'));
  // Fill in days of the month
  let weekIndex: number = -1;

  for(let day: DateTime = firstDay; day.month === firstDay.month; day = day.plus({days: 1})) {
    const dayOfWeek: number = getWeekdayIndex(day);

    if(weekIndex < 0 || !dayOfWeek) {
      weekIndex = weekIndex + 1;

      // Create new array with placeholders
      daysInWeekInMonth.push(Array(7).fill(undefined));
    }

    daysInWeekInMonth[weekIndex][dayOfWeek] = day;
  }

  return daysInWeekInMonth;
};

export interface CalendarProps {
  readonly dateDisabled: (date: any) => boolean;
  readonly maxDate: DateTime;
  readonly minDate: DateTime;
  readonly onChange: (event: React.MouseEvent<HTMLElement>, date: DateTime) => any;
  readonly onClose: () => any;
  readonly selectedDate: DateTime;
  readonly setSelected: (date: DateTime) => any;
}

export const Calendar = (props: CalendarProps): JSX.Element => {
  const {
    dateDisabled,
    maxDate,
    minDate,
    onChange,
    onClose,
    setSelected,
    selectedDate
  } = props;
  const classes: any = useStyles();
  const {month: selectedMonth, year: selectedYear} = selectedDate;

  // Get a list of weeks for the display month
  const [displayDate, setDisplayDate] = useState(selectedDate.set({day: 1}));
  const weeks: DateTime[][] = generateMonthCalendar(displayDate);

  const onSelectDate = selectDate(displayDate, onClose, onChange, setSelected, setDisplayDate);

  useEffect(() => {
    // Update display date time when time changes
    const [hour, minute] = selectedDate.toFormat('H:mm').split(':');
    setDisplayDate(displayDate.set({hour, minute}));
  }, [selectedDate]);

  return (
    <div className={classes.monthContainer}>
      <div className={classes.monthNavBar}>
        <div className={classes.buttons}>
          <IconButton
            disabled={!isPreviousValid(selectedMonth, selectedYear, minDate)}
            onClick={() => onPreviousYear(displayDate, setDisplayDate)}>
            <SkipPrevious />
          </IconButton>
          <IconButton
            disabled={!isPreviousValid(selectedMonth, selectedYear, minDate)}
            onClick={() => onPreviousMonth(displayDate, setDisplayDate)}>
            <ChevronLeft />
          </IconButton>
        </div>
        <div className={classes.calendarYears}>
          <div className={classes.calendarMonth}>
            {`${displayDate.toFormat('MMM yyyy')}`}
          </div>
        </div>
        <div className={classes.buttons}>
          <IconButton
            disabled={!isNextValid(selectedMonth, selectedYear, maxDate)}
            onClick={() => onNextMonth(displayDate, setDisplayDate)}>
            <ChevronRight />
          </IconButton>
          <IconButton
            disabled={!isNextValid(selectedMonth, selectedYear, maxDate)}
            onClick={() => onNextYear(displayDate, setDisplayDate)}>
            <SkipNext />
          </IconButton>
        </div>
      </div>
      <div className={classes.calendarContainer}>
        <div className={classes.week}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day: string, index: number) => (
            <div className={classes.labelWeekDay} key={`weekLabel-${index}`}>{day}</div>
          ))}
        </div>
        {weeks.map((week: DateTime[], index: number) => (
          <Weeks
            dateDisabled={dateDisabled}
            key={`weekRow-${index}`}
            maxDate={maxDate}
            minDate={minDate}
            onSelectDate={onSelectDate}
            selectedDate={selectedDate}
            week={week}
          />
        ))}
      </div>
    </div>
  );
};
