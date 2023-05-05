import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isDoneCheckHandler } from '../../../store/actions/actions';
import './Task.css';

const Task = ({ item, id, isDone, dataBaseKey, description, onCheckBoxClick }) => {
  // console.log(dataBaseKey, description, 'dataBsse');
  console.log(isDone, description);

  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem(
      `${description}`,
      JSON.stringify({ description: description, isDone: isDone }),
    );
  }, [description, isDone]);
  useEffect(() => {
    dispatch(isDoneCheckHandler(item));
  });

  return (
    <>
      <div className="task">
        <input
          type="checkbox"
          className="task-input"
          onChange={() => onCheckBoxClick(id, dataBaseKey, isDone)}
          defaultChecked={isDone}
        />
        <p className="task-desc"> {description}</p>
      </div>
    </>
  );
};

export default Task;
