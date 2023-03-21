import React from 'react';
import { useSelector } from 'react-redux';
import { TaskList } from '../../components/TaskList';
export { Calendar } from '../../components/Calendar';
import './Main.css';

const Main = () => {
  const { isError, error } = useSelector(state => state.main);

  console.log(error);
  return (
    <div className="main">
      {!isError ? (
        <>
          <Calendar />
          <TaskList />
        </>
      ) : (
        { error }
      )}
    </div>
  );
};
export default Main;
