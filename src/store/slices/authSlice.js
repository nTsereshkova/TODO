import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authentification',
  initialState: {
    isAuth: false,
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
      console.log(action.payload);
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    setTokenHandler: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', JSON.stringify(state.token));
    },
    setDataBaseKey: (state, action) => {
      console.log(typeof action.payload, 'from set data base key');
      //state.user.dataBaseKey = action.payload;
      //console.log(state.user.dataBaseKey);
      localStorage.setItem('data', JSON.stringify(action.payload));
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
      // localStorage.removeItem('user');
      // localStorage.removeItem('token');
      localStorage.clear();
      state.isAuth = false;
    },
    authErrorHandler: (state, action) => {
      state.error = action.payload;
      state.isError = true;
    },
  },
});

export default authSlice;
