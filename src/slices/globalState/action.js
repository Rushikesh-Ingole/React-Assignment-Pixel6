import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTable: 1,
};

export const globalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setActiveTable: (state, { payload }) => {
      state.activeTable = payload + 1;
    },
  },
});

export const { setActiveTable } = globalStateSlice.actions;
export default globalStateSlice.reducer;
