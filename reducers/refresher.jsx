import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: 0,
};

export const refresherSlice = createSlice({
  name: 'refresherReducer',
  initialState,
  reducers: {
    refresh : (state, action) => {
      state.value+=1
    }
  },
});

export const { refresh } = refresherSlice.actions;
export default refresherSlice.reducer;