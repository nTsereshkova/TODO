import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'main',
  initialState: {},
  reducers: {
    addTasks: (state, action) => {
      state.characters = [...action.payload];
      //state.showCharactersDetails = false;
    },
    mainErrorHandler: (state, action) => {
      state.error = action.payload;
      state.isError = true;
    },
  },
});

export default mainSlice;
