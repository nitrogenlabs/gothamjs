/**
 * Copyright (c) 2020-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import Popover from '@material-ui/core/Popover';
import {makeStyles} from '@material-ui/core/styles';
import {pad} from '@nlabs/utils';
import clsx from 'clsx';
import React, {useEffect, useRef, useState} from 'react';

const useStyles: any = makeStyles((theme: any) => ({
  selected: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light
  },
  timeButton: {
    alignItems: 'center',
    border: '1px solid transparent',
    borderRadius: 3,
    cursor: 'pointer',
    fontSize: 16,
    justifyContent: 'center',
    minWidth: 30,
    padding: theme.spacing(0.5),
    '&:hover': {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      fontWeight: 700
    }
  },
  timeListItem: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    fontSize: 14,
    justifyContent: 'center',
    paddingRight: theme.spacing(1),
    width: 50,
    height: 30,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  },
  timeList: ({maxHeight}: any) => ({
    color: theme.palette.primary.dark,
    flexDirection: 'column',
    listStyle: 'none',
    margin: 0,
    maxHeight,
    padding: 0
  })
}));

export const TimeButton = (props) => {
  const {
    className,
    interval = 15,
    selected,
    onSelect,
    type,
    use24Hour
  } = props;
  const maxHeight: number = type === 'meridiem' ? 60 : 150;
  const classes = useStyles({maxHeight});
  const buttonRef = useRef();
  const [buttonAnchor, setButtonRef] = useState();
  const [isOpen, setOpen] = useState(false);
  let timeList: string[];
  let vertical: number;
  let label: string;

  if(type === 'hour') {
    if(use24Hour) {
      timeList = Array.from({length: 24}, (item, index: number) => index.toString());
    } else {
      timeList = Array.from({length: 12}, (item, index: number) => (index + 1).toString());
    }

    vertical = -75;
    label = selected;
  } else if(type === 'minute') {
    const minuteLength: number = 60 / interval;
    timeList = Array.from({length: minuteLength}, (item, index: number) => pad(interval * index, 2).toString());
    vertical = -75;
    label = pad(selected, 2);
  } else {
    timeList = ['AM', 'PM'];
    vertical = -30;
    label = selected;
  }

  const onClose = () => setOpen(false);
  const onUpdate = (item: string) => {
    let formatItem: number;

    if(type === 'meridiem') {
      formatItem = item === 'AM' ? 0 : 1;
    } else {
      formatItem = +(item);
    }

    console.log('onUpdate::item', item, formatItem);
    onSelect(formatItem);
    onClose();
  };

  useEffect(() => {
    setButtonRef(buttonRef.current);
  }, []);

  console.log('TimeButton::selected', selected);
  return (
    <>
      <div
        className={clsx(classes.timeButton, className)}
        onClick={() => setOpen(true)}
        ref={buttonRef}>
        {label}
      </div>
      <Popover
        anchorEl={buttonAnchor}
        anchorOrigin={{horizontal: 'left', vertical}}
        onClose={onClose}
        open={isOpen}>
        <ul className={classes.timeList}>
          {timeList.map((number: string) => (
            <li
              className={clsx(classes.timeListItem, {[classes.selected]: number === selected})}
              key={`${type}-${number}`}
              onClick={() => onUpdate(number)}>{number}</li>
          ))}
        </ul>
      </Popover>
    </>
  );
};
