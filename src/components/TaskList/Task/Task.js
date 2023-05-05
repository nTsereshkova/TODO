import React from 'react';

import './Task.css';

const Task = ({ id, isDone, dataBaseKey, description, onCheckBoxClick }) => {
  console.log(dataBaseKey, description, 'dataBsse');

  return (
    <>
      <div className="task">
        <input
          type="checkbox"
          className="task-input"
          onChange={() => onCheckBoxClick(id, dataBaseKey, isDone)}
        />
        <p className="task-desc"> {description}</p>
      </div>
    </>
  );
};

export default Task;
