import React, { Component } from 'react';
import styles from '../Calendar/CalendarDark.module.scss';

import { Header } from '../Header/Header';
import { ThemeContext } from '../../context';
import { DARK_THEME, LIGHT_THEME } from '../../constants';
import { Month } from '../Month/Month';

interface ICalendar {
  selectedDate: Date;
  currentDate: Date;
  activeDay: number | undefined;
  today: number;
  currentMonth: number;
  currentMonthName: string;
  theme: string;
}

export class Calendar extends Component<{}, ICalendar> {
  clock: NodeJS.Timeout | undefined;

  constructor(props: {}) {
    super(props);
    const currentDate = new Date();
    this.state = {
      selectedDate: currentDate,
      currentDate: currentDate,
      today: currentDate.getDate(),
      activeDay: undefined,
      currentMonth: currentDate.getMonth(),
      currentMonthName: this.getMonthName(currentDate.getMonth()),
      theme: DARK_THEME,
    };
  }

  handleDateClick = (day: number): void => {
    const newDate = new Date(this.state.currentDate);
    newDate.setDate(day);
    this.setState({ selectedDate: newDate, activeDay: day });
  };

  updateCurrentTime = (): void => {
    const currentDate = new Date();
    this.setState({ currentDate });
  };

  getMonthName(month: number): string {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[month];
  }

  componentDidMount() {
    this.clock = setInterval(this.updateCurrentTime, 1000);
    this.setState({
      activeDay: this.state.currentDate.getDate(),
      today: this.state.currentDate.getDate(),
    });
  }

  componentWillUnmount() {
    clearInterval(this.clock);
  }

  toggleTheme = () => {
    const newTheme = this.state.theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    this.setState({ theme: newTheme });
  };

  render() {
    const { selectedDate, currentDate, currentMonth, currentMonthName, theme } = this.state;
    const daysMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate();
    const daysArray = [];
    for (let i = 1; i <= daysMonth; i++) {
      daysArray.push(i);
    }

    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <ThemeContext.Provider value={{ theme, setTheme: this.toggleTheme }}>
        <div className={styles.container}>
          <div className={`${styles.calendar} ${theme === DARK_THEME ? styles.darkTheme : styles.lightTheme}`}>
            <button className={styles.calendar__btnToggle} onClick={this.toggleTheme}>{theme === DARK_THEME ? "Light Theme" : "Dark Theme"}</button>
            <Header currentMonthName={currentMonthName} />
            <p className={styles.calendar__time}>{formattedTime}</p>
            <div className={styles.calendar__date}>
              <p>{currentDate.toDateString()}</p>
              <hr />
              <p>{selectedDate.toDateString()}</p>
            </div>
            <Month
              daysOfWeek={daysOfWeek}
              daysArray={daysArray}
              activeDay={this.state.activeDay}
              today={this.state.today}
              handleDateClick={this.handleDateClick}
            />
          </div>
        </div>
      </ThemeContext.Provider >
    );
  }
}


