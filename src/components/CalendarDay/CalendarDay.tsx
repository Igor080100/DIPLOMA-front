import styles from '../../scss/Calendar.module.scss'

interface ICalendarDayProps {
   day: number;
   activeDay: number | undefined;
   today: number;
   hasTasks: boolean;
   taskListEmpty: boolean;
   onClick: () => void;
}

export const CalendarDay: React.FC<ICalendarDayProps> = (props) => {

   const { day, activeDay, today, hasTasks, taskListEmpty, onClick } = props;

   return <div className={`${styles.day} ${activeDay === day ? styles.active : ''} ${today === day ? styles.today : ''} ${hasTasks ? styles.hasTasks : ''
      } ${taskListEmpty ? styles.noTasks : ''}`} onClick={onClick}>
      {day}
   </div>
}
