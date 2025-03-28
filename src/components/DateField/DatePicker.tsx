/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {useEffect, useState} from 'react';

import type {FC} from 'react';

interface DatePickerProps {
  initialDate?: number;
  maxDate?: number;
  minDate?: number;
  onDateSelect?: (date: number) => void;
}

export const DatePicker: FC<DatePickerProps> = ({
  initialDate = (new Date()).getTime(),
  maxDate,
  minDate,
  onDateSelect
}) => {
  const defaultDate = new Date(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);
  const [currentMonth, setCurrentMonth] = useState<number>(defaultDate.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(defaultDate.getFullYear());

  useEffect(() => {
    const updatedDate = new Date(initialDate);
    setSelectedDate(updatedDate);
    setCurrentMonth(updatedDate.getMonth());
    setCurrentYear(updatedDate.getFullYear());
  }, [initialDate]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(parseInt(e.target.value, 10));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(parseInt(e.target.value, 10));
  };

  const isDateInRange = (date: Date): boolean => {
    const dateTimestamp = date.getTime();

    if (minDate && dateTimestamp < minDate) {
      return false;
    }

    if (maxDate && dateTimestamp > maxDate) {
      return false;
    }

    return true;
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);

    if (!isDateInRange(newDate)) {
      return;
    }

    setSelectedDate(newDate);

    if (onDateSelect) {
      onDateSelect(newDate.getTime());
    }
  };

  // Get month name
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate years for dropdown (range based on min/max dates)
  const generateYearOptions = () => {
    let startYear = currentYear - 5;
    let endYear = currentYear + 5;

    if (minDate) {
      const minYear = new Date(minDate).getFullYear();
      startYear = minYear;
    }

    if (maxDate) {
      const maxYear = new Date(maxDate).getFullYear();
      endYear = maxYear;
    }

    return Array.from(
      {length: endYear - startYear + 1},
      (_, i) => startYear + i
    );
  };

  // Generate days for the calendar
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  const days = [];
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isSelected =
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear;

    const isDisabled = !isDateInRange(date);

    days.push(
      <button
        key={day}
        onClick={() => handleDateSelect(day)}
        disabled={isDisabled}
        className={`h-7 w-7 text-sm rounded-full flex items-center justify-center ${
          isSelected
            ? 'bg-blue-500 text-white'
            : isDisabled
              ? 'text-gray-300 cursor-not-allowed'
              : 'hover:bg-gray-200'
        }`}
      >
        {day}
      </button>
    );
  }

  const yearOptions = generateYearOptions();

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={handlePrevMonth}
          className="p-1 rounded-full hover:bg-gray-200 text-sm"
        >
          &lt;
        </button>
        <div className="flex space-x-1">
          <select
            value={currentMonth}
            onChange={handleMonthChange}
            className="border border-gray-300 rounded px-1.5 py-0.5 text-sm"
          >
            {monthNames.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          <div className="relative inline-flex items-center">
            <select
              value={currentYear}
              onChange={handleYearChange}
              className="px-1.5 py-0.5 text-sm appearance-none bg-transparent focus:outline-none pr-5 hover:text-blue-600 cursor-pointer"
              style={{
                MozAppearance: 'none',
                WebkitAppearance: 'none',
                scrollbarWidth: 'thin'
              }}
            >
              {yearOptions.map(year => (
                <option key={year} value={year} className="text-sm">
                  {year}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
              <svg className="h-3 w-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
        <button
          onClick={handleNextMonth}
          className="p-1 rounded-full hover:bg-gray-200 text-sm"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center font-medium text-gray-500 text-xs">
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
};

export default DatePicker;