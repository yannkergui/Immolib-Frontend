import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { 

        },
};

export const maVilleSlice = createSlice({
  name: 'maVille',
  initialState,
  reducers: {
    maVilleData : (state, action) => {
      state.value = action.payload
    }
  },
});

export const { maVilleData } = maVilleSlice.actions;
export default maVilleSlice.reducer;