import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { 

        },
};

export const monBienSlice = createSlice({
  name: 'monBien',
  initialState,
  reducers: {
    monBienData : (state, action) => {
      state.value = action.payload
    }
  },
});

export const { monBienData } = monBienSlice.actions;
export default monBienSlice.reducer;