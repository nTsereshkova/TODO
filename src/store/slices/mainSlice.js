import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    showCalendar: false,
  },
  reducers: {
    addTasks: (state, action) => {
      state.characters = [...action.payload];
      //state.showCharactersDetails = false;
    },
    mainErrorHandler: (state, action) => {
      state.error = action.payload;
      state.isError = true;
    },
    showCalendarHandler: state => {
      console.log('show cLLENADR CLICKED');
      state.showCalendar = !state.showCalendar;
    },
  },
});

export default mainSlice;
