import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    showCalendar: false,
    choosenDate: new Date(Date.now()),
    tasks: [
      // {
      //   id: 1,
      //   description: 'to do laundry',
      //   isDone:false
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
    // isDoneCheckHandler: (state, action) => {
    //   console.log(action.payload, 'isDoneCheckHandler');
    //   let task = JSON.parse(localStorage.getItem(`${action.payload.description}`));
    //   console.log(task, 'task to check wiyh localostorage');
    //   // прогнать через map на совпадение id таски , затем ей поменять исхождя из локал сторадж галочку
    //   // if (state.task.isDone) {
    //   //   // console.log('fgkjgfjfg)
    //   // }
    //   state.tasks.map(item =>
    //     item.description === action.payload.description
    //       ? (item.isDone = task.isDone)
    //       : item,
    //   );
    // },
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
