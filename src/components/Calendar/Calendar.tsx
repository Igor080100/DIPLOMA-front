import React, { Component } from 'react';
import styles from './Calendar.module.scss'


interface ICalendar {
  selectedDate: Date;
  currentDate: Date;
  activeDay: number | undefined;
  today: number;

}

export class Calendar extends Component<{}, ICalendar> {
  clock: NodeJS.Timeout | undefined;


  constructor(props: {}) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      currentDate: new Date(),
      today: new Date().getDate(),// Сьогоднішній день
      activeDay: undefined,// Активний день ще не вибраний
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

  componentDidMount() {
    this.clock = setInterval(this.updateCurrentTime, 1000);
    this.setState({// Встановлення активного дня 
      activeDay: this.state.currentDate.getDate(),
      today: this.state.currentDate.getDate(),
    });
  }
  componentWillUnmount() {
    clearInterval(this.clock);
  }

  render() {
    const { selectedDate, currentDate } = this.state;
    const daysMonth = new Date(0, 0, 0, 0, 0, 0).getDate(); // Кількість днів у місяці
    const daysArray = [];
    for (let i = 1; i <= daysMonth; i++) {
      daysArray.push(i);// Додавання чисел днів у масив
    }

    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    const daysOfWeek = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon',];


    return (
      <>
        <div className={styles.container}>
          <div className={styles.calendar}>
            <p className={styles.calendar__time}>{formattedTime}</p>
            <div className={styles.calendar__date}>
              <p>{currentDate.toDateString()}</p>
              <hr />
              <p>{selectedDate.toDateString()}</p>
            </div>
            <div className={styles.calendar__days}>
              {daysOfWeek.map(day => (
                <div className={styles.dayOfWeek} >{day}</div>))}
              {daysArray.map(day => (
                <div
                  className={`${styles.day} ${this.state.activeDay === day ? styles.active : ''} ${this.state.today === day ? styles.today : ''}`}
                  onClick={() => this.handleDateClick(day)}>
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div >
      </>
    );
  }
}



