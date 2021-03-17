/**
 * Copyright (c) 2020-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {makeStyles} from '@material-ui/core/styles';
import Schedule from '@material-ui/icons/Schedule';
import {DateTime} from 'luxon';
import React from 'react';

import {TimeButton} from './TimeButton';

const useStyles: any = makeStyles((theme: any) => ({
  icon: {
    color: theme.palette.neutral.dark,
    fontSize: 16,
    justifyContent: 'center',
    marginLeft: theme.spacing(0.5)
  },
  meridiemButton: {
    minWidth: 40
  },
  separator: {
    justifyContent: 'center'
  },
  timeSelect: {
    backgroundColor: '#f1f1f1',
    flex: 1,
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'center',
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`
  }
}));

export interface TimeSelectProps {
  readonly interval: number;
  readonly maxDate: DateTime;
  readonly minDate: DateTime;
  readonly onChange: (event: React.MouseEvent<HTMLElement>, date: DateTime) => any;
  readonly selectedDate: DateTime;
  readonly setSelected: (date: DateTime) => any;
  readonly use24Hour: boolean;
}

export const TimeSelect = (props: TimeSelectProps) => {
  const {interval, selectedDate, setSelected, use24Hour} = props;
  const hourFormat: string = use24Hour ? 'H' : 'h';
  const [hour, minute, meridiem] = selectedDate.toFormat(`${hourFormat}:mm:a`)
    .split(':')
    .map((value) => (isNaN(value) ? value : +(value)));
  const classes = useStyles();
  let meridiemButton: JSX.Element;

  if(!use24Hour) {
    meridiemButton = (
      <TimeButton
        className={classes.meridiemButton}
        interval={interval}
        onSelect={(meridiemType: number) => {
          const adjustedHour: number = hour === 12 ? 0 : hour;
          const hours: number = !meridiemType ? adjustedHour : adjustedHour + 12;
          console.log('meridiemButton::onSelect::hours', hours);
          setSelected(selectedDate.set({hours}));
        }}
        selected={meridiem}
        type="meridiem"
        use24Hour={use24Hour} />
    );
  }

  return (
    <div className={classes.timeSelect}>
      <TimeButton
        interval={interval}
        onSelect={(hours: number) => setSelected(selectedDate.set({hours}))}
        selected={hour}
        type="hour"
        use24Hour={use24Hour} />
      <div className={classes.separator}>:</div>
      <TimeButton
        interval={interval}
        onSelect={(minutes: number) => setSelected(selectedDate.set({minutes}))}
        selected={minute}
        type="minute"
        use24Hour={use24Hour} />
      {meridiemButton}
      <div className={classes.icon}><Schedule fontSize="inherit" /></div>
    </div>
  );
};
