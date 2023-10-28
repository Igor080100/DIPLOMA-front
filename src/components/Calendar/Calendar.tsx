import React, { useState, useEffect } from 'react';
import styles from '../../scss/Calendar.module.scss'
import { CalendarNavigation } from '../ClanedarNavigation/CalendarNavigation';
import { CurrentTime } from '../CurrentTime/CurrentTime';
import { CalendarDate } from '../CurrentDate/CurrentDate';
import { CalendarDays } from '../CalendarDays/CalendarDays';
import { CalendarTasks } from '../CalendarTasks/CalendarTasks';


const Calendar: React.FC<{}> = () => {

   const [selectedDate, setSelectedDate] = useState(new Date());
   const [currentDate, setCurrentDate] = useState(new Date());
   const [today, setToday] = useState(new Date().getDate());
   const [activeDay, setActiveDay] = useState<number | undefined>(undefined);
   const [tasks, setTasks] = useState<Array<{ date: string; task: string }>>([]);
   const [taskDays, setTaskDays] = useState<Array<number>>([]);
   const [addTaskInputValue, setAddTaskInputValue] = useState<string>('');
   const [editTaskInputValue, setEditTaskInputValue] = useState<string>('');
   const [currentTime, setCurrentTime] = useState(new Date());
   const [editingTask, setEditingTask] = useState<{ day: number; index: number } | null>(null);


   const updateCurrentTime = (): void => {
      setCurrentTime(new Date());
   };

   const toPreviousMonth = (): void => {
      const newCurrentDate = new Date(currentDate);
      newCurrentDate.setMonth(newCurrentDate.getMonth() - 1);
      setCurrentDate(newCurrentDate);
   };

   const toNextMonth = (): void => {
      const newCurrentDate = new Date(currentDate);
      newCurrentDate.setMonth(newCurrentDate.getMonth() + 1);
      setCurrentDate(newCurrentDate);
   };


   useEffect(() => {
      const fetchTasks = async () => {
         try {
            const response = await fetch(`http://localhost:3008/api/tasks`);
            if (response.ok) {
               const tasksData = await response.json();
               setTasks(tasksData);
            }
         } catch (error) {
            console.error('Error:', error);
         }
      };

      fetchTasks();
   }, [selectedDate]);


   useEffect(() => {
      const clock = setInterval(updateCurrentTime, 1000);
      const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const savedTaskDays = JSON.parse(localStorage.getItem('taskDays') || '[]');
      setTasks(savedTasks);
      setTaskDays(savedTaskDays);
      return () => {
         clearInterval(clock);
      };
   }, []);


   useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      localStorage.setItem('taskDays', JSON.stringify(taskDays));
   }, [tasks, taskDays]);


   const addTask = async (day: number): Promise<void> => {
      if (addTaskInputValue.trim()) {
         try {
            const dateString = selectedDate.toISOString().slice(0, 10);
            const newTask = { date: dateString, task: addTaskInputValue };
            const response = await fetch(`http://localhost:3008/api/tasks/${dateString}`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(newTask),
            });

            if (response.status === 201) {
               setTasks([...tasks, newTask]);
               if (!taskDays.includes(day)) {
                  setTaskDays([...taskDays, day]);
               }
            }
         } catch (error) {
            console.error('Error:', error);
         }
         setAddTaskInputValue('')
      }
   };


   const removeTask = async (day: number, taskIndex: number): Promise<void> => {
      const dateString = selectedDate.toISOString().slice(0, 10);

      try {
         const response = await fetch(`http://localhost:3008/api/tasks/${dateString}/${taskIndex}`, {
            method: 'DELETE',
         });

         if (response.status === 200) {
            const updatedTasks = tasks.filter((task, index) => index !== taskIndex);
            setTasks(updatedTasks);

            if (updatedTasks.every(task => task.date !== dateString)) {
               const updatedTaskDays = taskDays.filter((d) => d !== day);
               setTaskDays(updatedTaskDays);
            }
         }
      } catch (error) {
         console.error('Error:', error);
      }
   };


   const startEditingTask = (day: number, index: number): void => {
      setEditingTask({ day, index });
      setEditTaskInputValue(tasks.find((task, i) => i === index)!.task);
   };


   const updateTask = async (): Promise<void> => {
      if (editTaskInputValue && editingTask !== null) {
         try {
            const dateString = selectedDate.toISOString().slice(0, 10);
            const response = await fetch(`http://localhost:3008/api/tasks/${dateString}/${editingTask.index}`, {
               method: 'PUT',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ date: dateString, task: editTaskInputValue }),
            });

            if (response.status === 200) {
               const updatedTasks = tasks.map((task, index) => {
                  if (index === editingTask.index) {
                     return { ...task, task: editTaskInputValue };
                  }
                  return task;
               });
               setTasks(updatedTasks);
               setEditTaskInputValue('');
               setEditingTask(null);
            }
         } catch (error) {
            console.error('Error:', error);
         }
      }
   };


   const handleDateClick = (day: number): void => {
      const newDate = new Date(currentDate);
      newDate.setDate(day);
      setSelectedDate(newDate);
      setActiveDay(day);
      setEditingTask(null);
   };


   const dateString = selectedDate.toISOString().slice(0, 10);
   const taskList = tasks.filter(task => task.date === dateString).map((task) => task.task);
   const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
   const daysMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();


   const daysArray = [];
   for (let i = 1; i <= daysMonth; i++) {
      daysArray.push(i);
   }

   const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
   const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
   const daysMonthOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

   const emptyDays = [];
   for (let i = 0; i < firstDayOfMonth; i++) {
      const day = daysMonthOfPreviousMonth - firstDayOfMonth + i + 1;
      emptyDays.push(
         <div className={`${styles.day} ${styles.inactive}`} key={`empty-${i}`}>
            {day}
         </div>
      );
   }


   return (
      <div className={styles.container}>
         <div className={styles.calendar}>
            <CalendarNavigation toPreviousMonth={toPreviousMonth} toNextMonth={toNextMonth} />
            <CurrentTime formattedTime={formattedTime} />
            <CalendarDate currentDate={currentDate} selectedDate={selectedDate} />
            <CalendarDays
               daysOfWeek={daysOfWeek}
               emptyDays={emptyDays}
               daysArray={daysArray}
               activeDay={activeDay}
               today={today}
               taskDays={taskDays}
               taskList={taskList}
               handleDateClick={handleDateClick}
            />
            <CalendarTasks
               selectedDate={selectedDate}
               setAddTaskInputValue={setAddTaskInputValue}
               setEditTaskInputValue={setEditTaskInputValue}
               addTaskInputValue={addTaskInputValue}
               editTaskInputValue={editTaskInputValue}
               taskList={taskList}
               editingTask={editingTask}
               onAddTask={addTask}
               onRemoveTask={removeTask}
               onStartEditingTask={startEditingTask}
               onUpdateTask={updateTask}
            />
         </div>
      </div>
   );
};
export default Calendar;
