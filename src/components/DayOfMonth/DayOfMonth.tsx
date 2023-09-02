import React, { Component } from 'react';
import styles from '../Calendar/CalendarDark.module.scss';

interface DayOfMonthProps {
   day: number;
   active: boolean;
   today: number;
   onClick: () => void;
}


export class DayOfMonth extends React.Component<DayOfMonthProps> {
   render() {
      const { day, active, today, onClick } = this.props;
      return (
         <div
            className={`${styles.day} ${active ? styles.active : ''} ${day === today ? styles.today : ''}`}
            onClick={onClick}
         >{day}</div>
      )
   }

}
