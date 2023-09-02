import React, { Component, useContext } from 'react';
import styles from '../Calendar/CalendarDark.module.scss';
import { ThemeContext } from '../../context'; // Импорт контекста

interface HeaderProps {
   currentMonthName: string;
}

export class Header extends Component<HeaderProps> {
   render() {
      const { currentMonthName } = this.props;
      return (
         <ThemeContext.Consumer>
            {
               (theme: any) => {
                  const themeClass = theme === 'DARK' ? styles.darkHeader : styles.lightHeader;
                  return (
                     <div className={styles.monthHeader}>
                        <h2 className={themeClass}>
                           {currentMonthName}
                        </h2>
                     </div>
                  );
               }
            }
         </ThemeContext.Consumer>
      );
   }
}