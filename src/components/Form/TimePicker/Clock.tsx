/**
 * Copyright (c) 2020-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import Button from '@material-ui/core/Button';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import {DateTime} from 'luxon';
import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react';

import {ClockProps} from './Clock.types';

export const defaultTime = new Date(1970, 1, 1);

const useStyles: any = makeStyles((theme: Theme) => ({
  ampmButton: {
    minHeight: 'initial',
    minWidth: 'initial',
    padding: '4px 8px'
  },
  ampmButtons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  clockAnalogContainer: {
    padding: '16px 24px 24px'
  },
  clockBackground: {
    alignItems: 'center',
    background: theme.palette.background.default,
    borderRadius: '115px',
    cursor: 'pointer',
    display: 'flex',
    height: '230px',
    justifyContent: 'center',
    maxHeight: 'calc(100vw - 112px)',
    maxWidth: 'calc(100vw - 112px)',
    position: 'relative',
    width: '230px'
  },
  clockDigitContainer: {
    display: 'flex',
    flex: '1 1'
  },
  clockDigitalContainer: {
    display: 'flex',
    justifyContent: 'stretch',
    padding: '16px 16px 8px',
    userSelect: 'none'
  },
  clockHand: {
    backgroundColor: theme.palette.primary.main,
    height: '100%',
    position: 'relative',
    width: '100%'
  },
  clockHandContainer: {
    position: 'absolute',
    width: '2px'
  },
  clockHandHead: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '21px',
    height: '42px',
    left: '-20px',
    position: 'absolute',
    top: '-21px',
    width: '42px'
  },
  clockHandTail: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
    bottom: '-4px',
    height: '8px',
    left: '-3px',
    position: 'absolute',
    width: '8px'
  },
  clockText: {
    height: '16px',
    lineHeight: '16px',
    position: 'absolute',
    textAlign: 'center',
    userSelect: 'none',
    width: '16px'
  },
  clockTextFaded: {
    opacity: 0,
    pointerEvents: 'none'
  },
  clockTextSelected: {
    color: theme.palette.primary.contrastText
  },
  colonDigit: {
    textAlign: 'left',
    width: '18px'
  },
  digitText: {
    '&:active': {
      opacity: 0.7
    },
    cursor: 'pointer',
    width: '62px'
  },
  hourDigitContainer: {
    justifyContent: 'flex-end'
  },
  hourDigitText: {
    textAlign: 'right'
  },
  miniteDigitContainer: {
    justifyContent: 'flex-start'
  },
  minuteDot: {
    borderRadius: '3px',
    height: '6px',
    position: 'absolute',
    width: '6px'
  },
  minuteDotSelected: {
    backgroundColor: theme.palette.primary.contrastText
  },
  okToConfirmRow: {
    alignItems: 'center',
    display: 'flex',
    height: '48px',
    justifyContent: 'flex-end',
    marginTop: '-8px',
    padding: '0 6px'
  }
}));

export const fillInDigit = (number: number, digit: number) => {
  const max = Math.pow(10, digit);
  let clean = (number % max).toString();
  while(clean.length < digit) {
    clean = `0${clean}`;
  }
  return clean;
};

export const getClockRadius = (clockface) => {
  const background = clockface ? clockface.getBoundingClientRect().width : 230;
  return (background / 2) - 28;
};

export const getValue = (options: any[], target: {x: number, y: number}, origin: {x: number, y: number}): DateTime => {
  const radian: number = Math.atan2(target.y - origin.y, target.x - origin.x);
  const angle: number = radian + (Math.PI / 6 * 3) < 0 ? radian + (Math.PI / 6 * 15) : radian + (Math.PI / 6 * 3);
  const select: number = Math.round(angle / 2 / Math.PI * options.length);
  return options[select > options.length - 1 ? 0 : select];
};

export const getOriginPoint = (clockface) => {
  const clockfaceBox = clockface.getBoundingClientRect();
  return {x: clockfaceBox.left + (clockfaceBox.width / 2), y: clockfaceBox.top + (clockfaceBox.height / 2)};
};

export const getMouseTargetPoint = (event: React.MouseEvent<HTMLDivElement>) => {
  const mouse = event.nativeEvent;
  return {x: mouse.pageX, y: mouse.pageY};
};

export const getTouchTargetPoint = (event: React.TouchEvent<HTMLDivElement>) => {
  const touch = event.nativeEvent.touches[event.nativeEvent.touches.length - 1];
  return {x: touch.pageX, y: touch.pageY};
};

export const changeValue = (setSelected, setSelecting, onSelect) =>
  (
    label: string,
    selectedTime: DateTime,
    minutes: number,
    event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  ) => {
    let updatedTime: DateTime;

    if(minutes >= 0 && label === 'hour') {
      const hour: number = minutes + ((selectedTime.hours >= 12) ? 12 : 0);
      updatedTime = selectedTime.set({hour});
    } else if(minutes >= 0 && label === 'minute') {
      updatedTime = selectedTime.set({minute: minutes});
    }

    if(minutes >= 0) {
      setSelected(updatedTime);
      setSelecting(true);
    } else if(minutes >= 0) {
      setSelecting(minutes);
      onSelect(event, updatedTime);
    }
  };

export const mouseSelectClock = (clockface, setSelecting, onChangeValue) =>
  (event: React.MouseEvent<HTMLDivElement>, label: string, options: number[]) => {
    event.preventDefault();
    const selectedTime: DateTime = getValue(options, getMouseTargetPoint(event), getOriginPoint(clockface));
    setSelecting(true);
    onChangeValue(label, selectedTime, event);
  };

export const touchSelectClock = (clockface, setSelecting, onChangeValue) =>
  (event: React.TouchEvent<HTMLDivElement>, label: string, options: number[]) => {
    event.preventDefault();
    const selectedTime = getValue(options, getTouchTargetPoint(event), getOriginPoint(clockface));
    setSelecting(true);
    onChangeValue(label, selectedTime, event);
  };

export const mouseHoverClock = (selecting, clockface, onChangeValue) =>
  (event: React.MouseEvent<HTMLDivElement>, label: string, options: number[]) => {
    event.preventDefault();
    const selectedTime = getValue(options, getMouseTargetPoint(event), getOriginPoint(clockface));

    if(selecting && selectedTime !== undefined) {
      onChangeValue(label, selectedTime, event);
    }
  };
export const touchHoverClock = (clockface, onChangeValue) =>
  (event: React.TouchEvent<HTMLDivElement>, label: string, options: number[]) => {
    event.preventDefault();
    // const touch = event.nativeEvent.touches[event.nativeEvent.touches.length - 1]
    // const target = {x: touch.pageX, y: touch.pageY}
    const selectedTime = getValue(options, getTouchTargetPoint(event), getOriginPoint(clockface));

    if(selectedTime !== undefined) {
      onChangeValue(label, selectedTime, event);
    }
  };

export const confirmClock = (closeClock, setMode, setSelecting) =>
  (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, label: string) => {
    event.preventDefault();

    if(label === 'hour') {
      setMode('minute');
    } else {
      closeClock();
    }

    setSelecting(false);
  };

export const confirmTime = (onClose, onSelect) =>
  (event: React.MouseEvent<HTMLElement>, selectedTime: DateTime) => {
    onClose();
    onSelect(event, selectedTime);
  };

export const handleClickAmPm = (selectedTime, onChange, setSelected) =>
  (ampm: 'am' | 'pm', event: React.MouseEvent<HTMLElement>) => {
    const date = new Date(selectedTime || defaultTime);
    const hour = date.getHours();

    if(hour >= 12 && ampm === 'am') {
      date.setHours(hour - 12);
    } else if(hour < 12 && ampm === 'pm') {
      date.setHours(hour + 12);
    }

    setSelected(date);
    onChange(date, event);
  };

export const getSelectedDate = (selectedTime) => {
  const selecting = selectedTime;
  return selecting
    ? {
      ampm: selecting.getHours() >= 12 ? 'pm' : 'am',
      hour: selecting.getHours() >= 12 ? selecting.getHours() - 12 : selecting.getHours(),
      minute: selecting.getMinutes()
    }
    : {
      ampm: 'am',
      hour: 0,
      minute: 0
    };
};

export const ClockBase = (props: ClockProps, ref): JSX.Element => {
  const {onClose, onSelect, selectableMinutesInterval, setClockResize, value} = props;
  const classes: any = useStyles();

  // References
  const clockface = useRef(ref);

  // Initial state
  const [clockRadius, setClockRadius] = useState(getClockRadius(clockface));
  const [mode, setMode] = useState('hour');
  const [selectedTime, setSelected] = useState(value);
  const [selecting, setSelecting] = useState(false);

  const onSetClockRadius = useCallback(() => setClockRadius(getClockRadius(clockface)), [clockface]);

  if(setClockResize) {
    setClockResize(onSetClockRadius);
  }

  useEffect(() => {
    if(!setClockResize) {
      onSetClockRadius();
    }

    window.addEventListener('resize', onSetClockRadius);

    return () => {
      window.removeEventListener('resize', onSetClockRadius);
    };
  }, []);

  const hours: number[] = Array(12).fill(undefined).map((number, index) => (index === 0 ? 12 : index));
  const minutes: number[] = Array(60).fill(undefined).map((number, index) => {
    const minInterval = index % selectableMinutesInterval === 0 ? index : undefined;
    return !selectableMinutesInterval ? index : minInterval;
  });
  const formatSelected = getSelectedDate(selectedTime);
  const selectAngle = ((
    mode === 'hour' ? formatSelected.hour / hours.length : formatSelected.minute / minutes.length
  ) * 2 * Math.PI) - (Math.PI / 6 * 3);

  const onChangeValue = useCallback(
    changeValue(setSelected, setSelecting, onSelect),
    [setSelected, setSelecting, onSelect]
  );
  const onClickAmPm = useCallback(handleClickAmPm(selectedTime, onSelect, setSelected), []);
  const onMouseSelectClock = useCallback(
    mouseSelectClock(clockface, setSelected, onChangeValue),
    [clockface, setSelected, onChangeValue]
  );
  const onTouchSelectClock = useCallback(
    touchSelectClock(clockface, setSelected, onChangeValue),
    [clockface, setSelected, onChangeValue]
  );
  const onMouseHoverClock = useCallback(
    mouseHoverClock(selecting, clockface, onChangeValue),
    [selecting, clockface, onChangeValue]
  );
  const onTouchHoverClock = useCallback(
    touchHoverClock(clockface, onChangeValue),
    [clockface, onChangeValue]
  );
  const onConfirmClock = useCallback(
    confirmClock(onClose, setMode, setSelecting),
    [onClose, setMode, setSelecting]
  );
  // const onConfirmTime = useCallback(
  //   confirmTime(onClose, onSelect),
  //   [onClose, onSelect]
  // );

  const selectStyle = useCallback((index: number) => {
    const angle = (index / hours.length * 2 * Math.PI) - (Math.PI / 6 * 3);

    return {
      transform: `translate(${clockRadius * Math.cos(angle)}px, ${clockRadius * Math.sin(angle)}px)`,
      transition: selecting ? 'opacity 600ms ease-in-out' : 'opacity 600ms ease-in-out, color 0ms 600ms'
    };
  }, []);

  return (
    <div className={classes.root}>
      <div className={clsx(classes.clockDigitalContainer, classes.digitalContainer)}>
        <div className={clsx(classes.clockDigitContainer, classes.hourDigitContainer)}>
          <Typography color={mode === 'hour' ? 'primary' : 'inherit'} variant='h3'
            classes={{root: clsx(classes.digitText, classes.hourDigitText)}}
            onClick={() => setMode('hour')}>
            {formatSelected.hour === 0 ? 12 : formatSelected.hour}
          </Typography>
        </div>
        <div><Typography variant='h3' classes={{root: classes.colonDigit}}>:</Typography></div>
        <div className={clsx(classes.clockDigitContainer, classes.miniteDigitContainer)}>
          <Typography color={mode === 'minute' ? 'primary' : 'inherit'} variant='h3'
            classes={{root: classes.digitText}}
            onClick={() => setMode('minute')}>
            {fillInDigit(formatSelected.minute, 2)}
          </Typography>
          <div className={classes.ampmButtons}>
            <Button
              color={formatSelected.ampm === 'am' ? 'primary' : 'inherit'}
              classes={{root: classes.ampmButton}}
              onClick={(event) => onClickAmPm('am', event)}>
              AM
            </Button>
            <Button
              color={formatSelected.ampm === 'pm' ? 'primary' : 'inherit'}
              classes={{root: classes.ampmButton}}
              onClick={(event) => onClickAmPm('pm', event)}>
              PM
            </Button>
          </div>
        </div>
      </div>
      <div key='clock' className={classes.clockAnalogContainer}
        onMouseDown={(event) => onMouseSelectClock(event, mode, mode === 'hour' ? hours : minutes)}
        onTouchStart={(event) => onTouchSelectClock(event, mode, mode === 'hour' ? hours : minutes)}
        onMouseMove={(event) => onMouseHoverClock(event, mode, mode === 'hour' ? hours : minutes)}
        onTouchMove={(event) => onTouchHoverClock(event, mode, mode === 'hour' ? hours : minutes)}
        onMouseUp={(event) => onConfirmClock(event, mode)}
        onTouchEnd={(event) => onConfirmClock(event, mode)}>
        <div className={classes.clockBackground} ref={clockface}>
          <div className={classes.clockHandContainer}
            style={{
              height: clockRadius, paddingBottom: clockRadius,
              transform: `rotate(${selectAngle + (Math.PI / 6 * 3)}rad)`,
              transition: selecting ? '' : 'transform 600ms ease-in-out'
            }}>
            <div className={clsx(classes.clockHand, classes.hand)}>
              <div className={classes.clockHandHead} />
              <div className={classes.clockHandTail} />
            </div>
          </div>
          {hours.map((hour, index) => (
            <Typography
              className={clsx(
                classes.clockText,
                {[classes.clockTextSelected]: mode === 'hour' && formatSelected.hour === index},
                {[classes.clockTextFaded]: mode !== 'hour'}
              )}
              key={hour}
              style={selectStyle(0)}>
              {hour}
            </Typography>
          ))}
          {minutes.map((minute, index) => {
            if(minute % 5 === 0) {
              return (
                <Typography
                  className={clsx(
                    classes.clockText,
                    {[`${classes.clockTextSelected} ${classes.textSelected}`]: mode === 'minute' && formatSelected.minute === index},
                    {[classes.clockTextFaded]: mode !== 'minute'}
                  )}
                  key={index}
                  style={selectStyle(index)}>
                  {minute}
                </Typography>);
            }
            return (
              <div
                className={clsx(
                  classes.minuteDot,
                  {[classes.minuteDotSelected]: mode === 'minute' && formatSelected.minute === minute},
                  {[classes.clockTextFaded]: mode !== 'minute'}
                )}
                key={index}
                style={selectStyle(index)}
              />
            );
          })}
        </div>
      </div>
    </div>);
};

export const Clock = forwardRef(ClockBase);
