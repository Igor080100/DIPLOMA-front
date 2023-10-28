import styles from '../../scss/Calendar.module.scss'

interface ICalendarTasksProps {
   selectedDate: Date
   setAddTaskInputValue: (value: string) => void;
   setEditTaskInputValue: (value: string) => void;
   addTaskInputValue: string;
   editTaskInputValue: string;
   taskList: string[];
   editingTask: { day: number; index: number } | null;
   onAddTask: (day: number) => void;
   onRemoveTask: (day: number, index: number) => void;
   onStartEditingTask: (day: number, index: number) => void;
   onUpdateTask: () => void;
};

export const CalendarTasks: React.FC<ICalendarTasksProps> = (props) => {

   const {
      selectedDate,
      setAddTaskInputValue,
      setEditTaskInputValue,
      addTaskInputValue,
      editTaskInputValue,
      taskList,
      editingTask,
      onAddTask,
      onRemoveTask,
      onStartEditingTask,
      onUpdateTask,
   } = props;

   return (
      <div className={styles.calendar__todo} >
         <input className={styles.todoInput}
            type="text"
            placeholder="Введіть задачу на день"
            value={addTaskInputValue}
            onChange={e => setAddTaskInputValue(e.target.value)}
         />
         <button className={styles.todoBtn} onClick={() => onAddTask(selectedDate.getDate())}>Додати задачу</button>
         <ul className={styles.taskList}>
            {taskList.map((task, index) => (
               <li key={index}>
                  {editingTask?.day === selectedDate.getDate() && editingTask!.index === index ? (
                     <div className={styles.changeTasks}>
                        <input className={styles.changeInput}
                           type="text"
                           value={editTaskInputValue}
                           onChange={(e) => setEditTaskInputValue(e.target.value)}
                        />
                        <button className={styles.changeBtn} onClick={onUpdateTask}>Зберегти</button>
                     </div>
                  ) : (
                     <div className={styles.tasks}>
                        <p className={styles.task}>{task}</p>
                        <div >
                           <button className={styles.btnTwo} onClick={() => onStartEditingTask(selectedDate.getDate(), index)}>Редагувати</button>
                           <button className={styles.btnOne} onClick={() => onRemoveTask(selectedDate.getDate(), index)}>X</button>
                        </div>
                     </div>
                  )}
               </li>
            ))}
         </ul>
      </div>
   );
};