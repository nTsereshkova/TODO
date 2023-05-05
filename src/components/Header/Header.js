import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutHandler } from '../../store/actions/actions';
import './Header.css';

const Header = () => {
  const { user, isAuth } = useSelector(state => state.auth);
  console.log('user', user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authHandler = () => {
    // на случай если нажимаем на кнопку находясь на странице конкретной таски
    navigate('/');
    dispatch(logoutHandler());
  };

  return (
    <div className="header">
      <div className="header_info">
        <p> Tassker </p>
      </div>
      <div className="header_auth">
        {/* {isAuth && <div className="header_auth_user">{user.login}</div>} */}
        {isAuth && <div onClick={authHandler}> Exit</div>}
      </div>
    </div>
  );
};

export default Header;

{
  /* <MdExitToApp className="logo" onClick={authHandler}
/> */
}

// добавить кнопку выйти
