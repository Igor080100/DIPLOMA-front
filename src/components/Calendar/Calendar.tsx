import React, { useState, useEffect, FC } from 'react';
import styles from '../Calendar/CalendarDark.module.scss';

import Header from '../Header/Header';
import Month from '../Month/Month';

import { DARK_THEME } from '../../constants';

interface ICalendar {
  theme: string;
  toggleTheme: () => void;
}
const Calendar: FC<ICalendar> = (props) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeDay, setActiveDay] = useState<number | undefined>(undefined);

  const currentMonth = new Date().getMonth();
  const currentDate = new Date();
  const today = currentDate.getDate();

  const getMonthName = (month: number): string => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[month];
  };



  const [currentMonthName] = useState<string>(getMonthName(currentDate.getMonth()));


  const handleDateClick = (day: number): void => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
    setActiveDay(day);
  };

  const daysMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate();
  const daysArray = [];
  for (let i = 1; i <= daysMonth; i++) {
    daysArray.push(i);
  }

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={styles.container}>
      <div className={`${styles.calendar} ${props.theme === DARK_THEME ? styles.darkTheme : styles.lightTheme}`}>
        <button className={styles.calendar__btnToggle} onClick={props.toggleTheme}>
          {props.theme === DARK_THEME ? 'Light Theme' : 'Dark Theme'}
        </button>
        <Header currentMonthName={currentMonthName} theme={props.theme} />
        <div className={styles.calendar__date}>
          <p>{currentDate.toDateString()}</p>
          <hr />
          <p>{selectedDate.toDateString()}</p>
        </div>
        <Month
          daysOfWeek={daysOfWeek}
          daysArray={daysArray}
          activeDay={activeDay}
          today={today}
          handleDateClick={handleDateClick}
        />
      </div>
    </div>
  );
}

export default Calendar;
