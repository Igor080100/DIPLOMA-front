import React from 'react';
import styles from '../Calendar/CalendarDark.module.scss';

interface WeekDayProps {
   day: string;
}

export class WeekDay extends React.Component<WeekDayProps> {
   render() {
      return (
         <div className={`${styles.dayOfWeek}`}>
            {this.props.day}
         </div>
      );
   }
}

