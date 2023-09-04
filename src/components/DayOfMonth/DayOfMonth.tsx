import React, { FC } from 'react';
import styles from '../Calendar/CalendarDark.module.scss';

interface IDayOfMonthProps {
   day: number;
   active: boolean;
   today: number;
   onClick: () => void;
}

const DayOfMonth: FC<IDayOfMonthProps> = (props) => {
   const { day, active, today, onClick } = props;
   return (
      <div
         className={`${styles.day} ${active ? styles.active : ''} ${day === today ? styles.today : ''}`}
         onClick={onClick}
      >
         {day}
      </div>
   );
}

export default DayOfMonth;
