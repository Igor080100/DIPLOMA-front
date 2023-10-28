import styles from '../../scss/Calendar.module.scss'

type TCurrentTimeProps = {
   formattedTime: string;
};

export const CurrentTime: React.FC<TCurrentTimeProps> = (props) => {
   return <p className={styles.calendar__time}>{props.formattedTime}</p>
};