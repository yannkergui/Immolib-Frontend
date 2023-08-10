import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { 

        },
};

export const userMaVisiteSlice = createSlice({
  name: 'userMaVisite',
  initialState,
  reducers: {
    userMaVisiteData : (state, action) => {
      state.value = action.payload
    }
  },
});

export const { userMaVisiteData } = userMaVisiteSlice.actions;
export default userMaVisiteSlice.reducer;