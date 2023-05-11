import React from 'react';
import './Task.css';

const Task = ({ item, isDone, description, onCheckBoxClick }) => {
  return (
    <>
      <div className="task">
        <input
          type="checkbox"
          className="task-input"
          onChange={() => onCheckBoxClick(item)}
          defaultChecked={isDone}
        />
        <p className="task-desc"> {description}</p>
      </div>
    </>
  );
};

export default Task;
