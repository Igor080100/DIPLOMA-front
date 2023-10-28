import styles from '../../scss/Calendar.module.scss'

type TCalendarNavigationProps = {
   toPreviousMonth: () => void;
   toNextMonth: () => void;
};

export const CalendarNavigation: React.FC<TCalendarNavigationProps> = (props) => {
   const { toPreviousMonth, toNextMonth } = props;
   return (
      <div className={styles.calendar__nav}>
         <button className={styles.navBtnPrev} onClick={toPreviousMonth}>Попередній місяць</button>
         <button className={styles.navBtnNext} onClick={toNextMonth}>Наступний місяць</button>
      </div>
   );
};