import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    showCalendar: false,
    choosenDate: new Date(Date.now()).toUTCString(),
    tasks: [
      // пример вида каждого task
      // {
      //   id: 1,
      //   description: 'to do laundry',
      //   isDone:false,
      //   dataBaseKey: "-NV9uSZyXwCp2UojMciQ",
      // },
    ],
  },
  reducers: {
    addTasks: (state, action) => {
      if (action.payload) {
        state.tasks = [...action.payload];
      }
    },
    addNewTaskHandler: (state, action) => {
      if (action.payload) {
        state.tasks.push({ id: uuid(), description: action.payload, isDone: false });
      }
    },
    taskIsDoneHandler: (state, action) => {
      console.log('onCheckBoxClick   taskIsDoneHandler', action.payload);
      state.tasks.map(task =>
        task.id === action.payload ? (task.isDone = !task.isDone) : task,
      );
    },
    mainErrorHandler: (state, action) => {
      state.error = action.payload;
      state.isError = true;
    },
    showCalendarHandler: state => {
      console.log('show cLLENADR CLICKED');
      state.showCalendar = !state.showCalendar;
    },
    clearTasksWhenLogOut: state => {
      state.tasks.map(item => {
        localStorage.removeItem(`${item.description}`);
      });
    },
  },
});

export default mainSlice;
