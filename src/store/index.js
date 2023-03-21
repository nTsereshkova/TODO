import { configureStore } from '@reduxjs/toolkit';
import mainSlice from './slices/mainSlice';
import authSlice from './slices/authSlice';

const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
