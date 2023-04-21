import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    showCalendar: false,
    choosenDate: new Date(Date.now()),
    tasks: [
      {
        id: 1,
        description: 'to do laundry',
      },
      {
        id: 2,
        description: 'to clean the carpet',
      },
      {
        id: 3,
        description: ' buy groceries',
      },
      {
        id: 4,
        description: ' cook lunch',
      },
    ],
  },
  reducers: {
    addTasks: (state, action) => {
      console.log('добавилась задача');
      console.log(action.payload);
      // тут не добавляет корректно
      state.tasks = [...{ id: state.tasks.length + 1, description: action.payload }];
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

// послать автозапрос на установление в стейт текущей даты
