import React, { FC } from 'react';
import styles from '../Calendar/CalendarDark.module.scss';
import DayOfMonth from '../DayOfMonth/DayOfMonth';

interface IMonthProps {
   daysOfWeek: Array<string>;
   daysArray: Array<number>;
   activeDay: number | undefined;
   today: number;
   handleDateClick: (day: number) => void;
}

const Month: FC<IMonthProps> = (props) => {
   return (
      <div className={`${styles.calendar__days}`}>
         {props.daysOfWeek.map((day, index) => (
            <div key={index}>{day}</div>
         ))}
         {props.daysArray.map((day) => (
            <DayOfMonth
               key={day}
               day={day}
               active={props.activeDay === day}
               today={props.today}
               onClick={() => props.handleDateClick(day)}
            />
         ))}
      </div>
   );
}

export default Month;
