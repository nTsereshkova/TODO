import React from 'react';
import './Task.css';

const Task = ({ name, description }) => {
  return (
    <>
      <div className="task">
        <input type="checkbox" className="task-input" />
        <p className="task-desc"> {description}</p>
      </div>
    </>
  );
};

export default Task;
