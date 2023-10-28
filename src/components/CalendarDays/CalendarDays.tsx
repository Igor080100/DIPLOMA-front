import styles from '../../scss/Calendar.module.scss'

interface ICalendarDaysProps {
   daysOfWeek: string[];
   emptyDays: React.ReactNode[];
   daysArray: number[];
   activeDay: number | undefined;
   today: number;
   taskDays: number[];
   taskList: string[];
   handleDateClick: (day: number) => void;
};

export const CalendarDays: React.FC<ICalendarDaysProps> = (props) => {

   const { daysOfWeek, emptyDays, daysArray, activeDay, today, taskDays, taskList, handleDateClick } = props;


   return (
      <div className={styles.calendar__days}>
         <div className={styles.daysBox}>
            {daysOfWeek.map((day) => (
               <div className={styles.dayOfWeek} key={day}>
                  {day}
               </div>
            ))}
            {emptyDays}
            {daysArray.map((day) => (
               <div
                  className={`${styles.day} ${activeDay === day ? styles.active : ''
                     } ${today === day ? styles.today : ''
                     } ${taskDays.includes(day) ? styles.hasTasks : ''
                     } ${taskList.length === 0 ? styles.noTasks : ''}`}
                  onClick={() => handleDateClick(day)}
                  key={day}
               >
                  {day}
               </div>
            ))}
         </div>
      </div>
   )
};