import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
// import { deleteTaskHandler } from '../../../store/actions/actions';
import './Task.css';

const Task = ({ item, isDone, description, onCheckBoxClick, deleteHandler }) => {
  return (
    <div className="task-div">
      {<AiFillDelete className="delete" onClick={() => deleteHandler(item)} />}
      <div className="task">
        <input
          type="checkbox"
          className="task-input"
          onChange={() => onCheckBoxClick(item)}
          defaultChecked={isDone}
        />
        <p className="task-desc"> {description}</p>
      </div>
    </div>
  );
};

export default Task;
