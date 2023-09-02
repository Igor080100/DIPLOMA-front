import React, { Component } from 'react';
import styles from '../Calendar/CalendarDark.module.scss';
import { DayOfMonth } from '../DayOfMonth/DayOfMonth';


interface MonthProps {
   daysOfWeek: Array<string>;
   daysArray: Array<number>;
   activeDay: number | undefined;
   today: number;
   handleDateClick: (day: number) => void;
}

export class Month extends Component<MonthProps> {
   render() {
      const { daysArray, activeDay, today, handleDateClick, daysOfWeek } = this.props;
      return (
         <div className={`${styles.calendar__days}`}>
            {daysOfWeek.map(day =>
               <div>{day}</div >)}
            {daysArray.map(day => (
               <DayOfMonth
                  key={day}
                  day={day}
                  active={activeDay === day}
                  today={today}
                  onClick={() => handleDateClick(day)}
               />
            ))}
         </div>
      );
   }
}
