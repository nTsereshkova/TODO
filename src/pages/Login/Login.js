import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginFetch } from '../../store/actions/actions';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();

  const { error, isError } = useSelector(state => state.auth);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const changeHandler = event => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  return (
    <div className="auth">
      <form className="auth_form">
        <input
          placeholder="email"
          name="email"
          type="email"
          onChange={changeHandler}
        />
        <input
          placeholder="password"
          type="password"
          name="password"
          onChange={changeHandler}
        />
        <button
          onClick={() => dispatch(loginFetch(userData))}
          type="button"
          className="auth_btn"
        >
          Login
        </button>
      </form>
      {isError && <div className="auth_err"> {error}</div>}
    </div>
  );
};
export default Login;
