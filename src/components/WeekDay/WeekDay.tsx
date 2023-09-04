import React, { FC } from 'react';
import styles from '../Calendar/CalendarDark.module.scss';

interface IWeekDayProps {
   day: string;
}

const WeekDay: FC<IWeekDayProps> = (props) => {
   return <div className={`${styles.dayOfWeek}`}>{props.day}</div>;
}

export default WeekDay;
