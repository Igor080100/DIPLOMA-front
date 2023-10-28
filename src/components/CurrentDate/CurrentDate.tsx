import styles from '../../scss/Calendar.module.scss'

type TCalendarDateProps = {
   currentDate: Date;
   selectedDate: Date;
};

export const CalendarDate: React.FC<TCalendarDateProps> = (props) => {
   const { currentDate, selectedDate } = props;
   return (
      <div className={styles.calendar__date} >
         <p>{currentDate.toLocaleDateString('uk-UA', { year: 'numeric', month: 'long' })}</p>
         <hr />
         <p>{selectedDate.toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </ div>
   );
};