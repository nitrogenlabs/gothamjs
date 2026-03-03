import {DateTime} from 'luxon';

type DateInput = Date | string | number

export const formatRelativeDate = (value: DateInput): string => {
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

  if(!dateTime.isValid) {
    return '';
  }

  return dateTime.toRelative() || dateTime.toLocaleString(DateTime.DATETIME_SHORT);
};
