import React from 'react';
import { useSelector } from 'react-redux';
import { TaskList } from '../../components/TaskList';
import { CalendarList } from '../../components/CalendarList';
import './Main.css';

const Main = () => {
  const { isError, error } = useSelector(state => state.main);

  if (error) {
    console.log('error', error);
  }

  return (
    <div className="main">
      {!isError ? (
        <>
          <CalendarList />
          <TaskList />
        </>
      ) : (
        { error }
      )}
    </div>
  );
};
export default Main;
