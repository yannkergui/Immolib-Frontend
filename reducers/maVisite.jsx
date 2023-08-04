import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { 

        },
};

export const maVisiteSlice = createSlice({
  name: 'maVisite',
  initialState,
  reducers: {
    maVisiteData : (state, action) => {
      state.value = action.payload
    }
  },
});

export const { maVisiteData } = maVisiteSlice.actions;
export default maVisiteSlice.reducer;