import React from 'react';
import styles from '../Calendar/CalendarDark.module.scss';

interface IWeekDayProps {
   day: string;
}

export class WeekDay extends React.Component<IWeekDayProps> {
   render() {
      return (
         <div className={`${styles.dayOfWeek}`}>
            {this.props.day}
         </div>
      );
   }
}

