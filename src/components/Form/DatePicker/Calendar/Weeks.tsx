/**
 * Copyright (c) 2020-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {makeStyles} from '@material-ui/core/styles';
import {DateTime} from 'luxon';
import React from 'react';

import {Week} from './Week';
import {WeeksProps} from './Weeks.types';

const useStyles: any = makeStyles({
  week: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export const Weeks = (props: WeeksProps) => {
  const {dateDisabled, maxDate, minDate, onSelectDate, selectedDate, week} = props;
  const classes: any = useStyles();

  return (
    <div className={classes.week}>
      {week.map((date: DateTime, index: number) => (
        <Week
          date={date}
          dateDisabled={dateDisabled}
          key={`week-${index}`}
          maxDate={maxDate}
          minDate={minDate}
          onSelectDate={onSelectDate}
          selectedDate={selectedDate} />
      ))}
    </div>
  );
};
