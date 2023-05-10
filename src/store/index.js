import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import mainSlice from './slices/mainSlice';
import authSlice from './slices/authSlice';

const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: [thunk],
});

export default store;
