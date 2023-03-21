import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authentification',
  initialState: {
    isAuth: true,
    user: {
      login: '',
      email: '',
    },
    token: '',
    error: '',
    isError: false,
  },
  reducers: {
    loginHandler: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    setTokenHandler: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', JSON.stringify(state.token));
    },
    loginCheckStatusHandler: state => {
      state.user = JSON.parse(localStorage.getItem('user'));
      if (state.user) {
        state.isAuth = true;
      }
      state.token = JSON.parse(localStorage.getItem('token'));
    },

    logoutHandler: state => {
      state.user.login = '';
      state.user.email = '';
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      state.isAuth = false;
    },
    authErrorHandler: (state, action) => {
      state.error = action.payload;
      state.isError = true;
    },
  },
});

export default authSlice;
