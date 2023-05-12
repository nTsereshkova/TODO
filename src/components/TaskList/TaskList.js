import { useState } from 'react';
import { Task } from './Task';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
//import { addTasks } from '../../store/actions/actions';
import {
  addNewTask,
  taskIsDoneHandler,
  taskIsDonePatch,
  blabla,
} from '../../store/actions/actions';

import './TaskList.css';

const TaskList = () => {
  const [addTask, setAddTask] = useState(false);
  const { tasks, choosenDate } = useSelector(state => state.main);
  //console.log('tasks from taskList', tasks);

  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const typeTaskHandler = event => {
    setTask(event.target.value);
  };
  const addNewTaskHandler = () => {
    if (task) {
      dispatch(addNewTask(task, choosenDate));
    }
    setAddTask(false);
    setTask('');
  };

  let showFirstDot = false;
  if (tasks.length > 0) {
    showFirstDot = true;
  }
  let showSecondDot = false;
  tasks.forEach(item => {
    if (item.isDone === true) {
      showSecondDot = true;
    }
  });

  return (
    <div className="task-list">
      <div className="show-dots">
        {showFirstDot && <div className="dot"> </div>}
        {showSecondDot && <div className="second-dot"> </div>}
      </div>

      <p> {tasks.length} Tasks Today </p>
      {tasks.map(item => (
        <Task
          key={item.id}
          id={item.id}
          item={item}
          description={item.description}
          isDone={item.isDone}
          dataBaseKey={item.dataBaseKey}
          onCheckBoxClick={item => {
            dispatch(taskIsDonePatch(item, choosenDate));
          }}
        />
      ))}

      {addTask ? (
        <form className="form">
          <input className="form_input" onChange={typeTaskHandler} />
          <button type="button" className="add-new-task" onClick={addNewTaskHandler}>
            Add task
          </button>
        </form>
      ) : (
        <>
          <p> add new task </p>
          <button className="add-new-task" onClick={() => setAddTask(true)}>
            +
          </button>
        </>
      )}
    </div>
  );
};

export default TaskList;
