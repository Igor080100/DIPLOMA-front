import React, { FC } from 'react';
import styles from '../Calendar/CalendarDark.module.scss';

interface IHeaderProps {
   currentMonthName: string;
   theme: string;
}

const Header: FC<IHeaderProps> = (props) => {
   return (
      <div className={styles.monthHeader}>
         <h2 className={props.theme === 'DARK' ? styles.darkHeader : styles.lightHeader}>
            {props.currentMonthName}
         </h2>
      </div>
   );
}

export default Header;
