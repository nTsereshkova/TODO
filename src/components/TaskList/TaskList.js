import { useState } from 'react';
import { Task } from './Task';
import { useSelector, useDispatch } from 'react-redux';
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
  const tasks = useSelector(state => state.main.tasks);
  //console.log('tasks from taskList', tasks);

  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const typeTaskHandler = event => {
    setTask(event.target.value);
  };
  const addNewTaskHandler = () => {
    // dispatch(addTasks(task));
    dispatch(addNewTask(task));
    // dispatch(blabla());
    setAddTask(false);
    setTask('');
  };

  // useEffect(() => {
  //   dispatch(isDoneCheckHandler(item));
  // });

  return (
    <div className="task-list">
      <p> {tasks.length} Tasks Today </p>
      {tasks.map(item => (
        <Task
          key={item.id}
          //name={item.name}
          id={item.id}
          item={item}
          description={item.description}
          isDone={item.isDone}
          dataBaseKey={item.dataBaseKey}
          // onCheckBoxClick={(someId, dataBaseKey, isDone) => {
          //   dispatch(taskIsDoneHandler(someId));
          //   dispatch(taskIsDonePatch(dataBaseKey, isDone));
          // }}
          onCheckBoxClick={item => {
            dispatch(taskIsDonePatch(item));
          }}
          // taskCount={tasks.length}
        />
      ))}

      {addTask ? (
        <form>
          <input onChange={typeTaskHandler} />
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
