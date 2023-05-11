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
    firstLoad: true,
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
      //console.log(action.payload, 'from set data base key');
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
    firstLoadHandler: (state, action) => {
      state.firstLoad = action.payload;
    },
    logoutHandler: state => {
      state.user.login = '';
      state.user.email = '';
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      //localStorage.clear();
      state.isAuth = false;
    },
    authErrorHandler: (state, action) => {
      console.log(action.payload, 'from auth error handler');
      state.error = action.payload;
      state.isError = true;
    },
    clearErrorHandler: state => {
      state.error = '';
      state.isError = false;
    },
  },
});

export default authSlice;
