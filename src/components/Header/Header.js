import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SlLogout } from 'react-icons/sl';
import {
  logoutHandler,
  clearTasksWhenLogOut,
  firstLoadHandler,
} from '../../store/actions/actions';
import './Header.css';

const Header = () => {
  const { isAuth } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authHandler = () => {
    // на случай если нажимаем на кнопку находясь на странице конкретной таски
    navigate('/');
    dispatch(logoutHandler());
    dispatch(clearTasksWhenLogOut());
    // добавила переменную firstload, чтобы при разлогинивании не перекидывал useEffect компонента Sign на страницу login
    dispatch(firstLoadHandler(true));
  };

  return (
    <div className="header">
      <div className="header_info">
        <p> Tassker </p>
      </div>
      {isAuth && <SlLogout className="header_exit" onClick={authHandler} />}
    </div>
  );
};

export default Header;
