import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFetch } from '../../store/actions/actions';
import './Sign.css';

const Sign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isError, isAuth, firstLoad } = useSelector(state => state.auth);

  if (error) {
    console.log(error);
  }

  const [userData, setUserData] = useState({
    login: '',
    email: '',
    password: '',
  });

  const changeHandler = event => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const signInHandler = userData => {
    dispatch(signInFetch(userData));
  };

  useEffect(() => {
    // по умолчанию знаечние isError false
    if (isError === false && firstLoad === false) {
      navigate('/login');
    }
  }, [isError, firstLoad, navigate]);

  return (
    <div className="auth">
      <form className="auth_form">
        <input
          placeholder="login"
          type="text"
          name="login"
          onChange={changeHandler}
        />
        <input
          placeholder="email"
          type="email"
          name="email"
          onChange={changeHandler}
        />
        <input
          placeholder="password"
          type="password"
          name="password"
          onChange={changeHandler}
        />
        <button
          onClick={() => signInHandler(userData)}
          type="button"
          className="auth_btn"
        >
          Sign in
        </button>
        <button
          onClick={() => navigate('/login')}
          type="button"
          className="auth_btn"
        >
          Login
        </button>
        <p> Press here if you already have an account</p>
      </form>
      {isError && <div className="auth_err"> {error}</div>}
    </div>
  );
};
export default Sign;
