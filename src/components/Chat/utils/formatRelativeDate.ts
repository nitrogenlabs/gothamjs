import {DateTime} from '@nlabs/utils/date';
import {useEffect, useMemo, useState} from 'react';

export type DateInput = Date | string | number

export const resolveDateValue = (added?: DateInput, date?: DateInput): DateInput | undefined => {
  if(added !== undefined && added !== null && added !== '') {
    return added;
  }

  if(date !== undefined && date !== null && date !== '') {
    return date;
  }

  return undefined;
};

const parseRelativeDateInput = (value: DateInput): DateTime => {
  let dateTime: DateTime;

  if(value instanceof Date) {
    dateTime = DateTime.fromJSDate(value);
  } else if(typeof value === 'number') {
    dateTime = DateTime.fromMillis(value);
  } else {
    dateTime = DateTime.fromISO(value);

    if(!dateTime.isValid) {
      dateTime = DateTime.fromRFC2822(value);
    }
    if(!dateTime.isValid) {
      dateTime = DateTime.fromHTTP(value);
    }
    if(!dateTime.isValid) {
      dateTime = DateTime.fromSQL(value);
    }
    if(!dateTime.isValid) {
      dateTime = DateTime.fromJSDate(new Date(value));
    }
  }

  return dateTime;
};

const getRelativeDateRefreshMs = (dateTime: DateTime): number => {
  const minutesFromNow = Math.abs(DateTime.now().diff(dateTime, 'minutes').minutes);

  if(minutesFromNow < 60) {
    return 300_000;
  }

  return 0;
};

const formatTimestampDate = (dateTime: DateTime): string => {
  if(dateTime.hasSame(DateTime.now(), 'day')) {
    return dateTime.toLocaleString(DateTime.TIME_SIMPLE);
  }

  return dateTime.toLocaleString(DateTime.DATETIME_SHORT);
};

export const formatRelativeDate = (value: DateInput): string => {
  const dateTime = parseRelativeDateInput(value);

  if(!dateTime.isValid) {
    return '';
  }

  const minutesFromNow = Math.abs(DateTime.now().diff(dateTime, 'minutes').minutes);

  if(minutesFromNow < 60) {
    return dateTime.toRelative() || formatTimestampDate(dateTime);
  }

  return formatTimestampDate(dateTime);
};

export const useRelativeDateText = (value?: DateInput, dateString?: string): string => {
  const valueKey = useMemo(() => {
    if(value instanceof Date) {
      return String(value.getTime());
    }

    return String(value || '');
  }, [value]);
  const [relativeDateText, setRelativeDateText] = useState(() => {
    if(dateString) {
      return dateString;
    }

    return value ? formatRelativeDate(value) : '';
  });

  useEffect(() => {
    if(dateString) {
      setRelativeDateText(dateString);
      return;
    }

    if(value === undefined || value === null || value === '') {
      setRelativeDateText('');
      return;
    }

    const dateTime = parseRelativeDateInput(value);

    if(!dateTime.isValid) {
      setRelativeDateText('');
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const updateRelativeDateText = () => {
      setRelativeDateText(formatRelativeDate(value));
      const refreshMs = getRelativeDateRefreshMs(dateTime);

      if(refreshMs > 0) {
        timeoutId = setTimeout(updateRelativeDateText, refreshMs);
      }
    };

    updateRelativeDateText();

    return () => {
      if(timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [dateString, value, valueKey]);

  return relativeDateText;
};
