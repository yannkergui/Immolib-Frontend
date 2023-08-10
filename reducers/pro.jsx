import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: '',
};

export const proSlice = createSlice({
  name: 'pro',
  initialState,
  reducers: {
    // profilage : (state, action) => {
    //   state.value.profil = action.payload;
    // },
    proDatas : (state, action) => {
      state.value = action.payload;
    },
    updateProProfilePhoto: (state, action) => {
      state.value.photo = action.payload;
    },
  }
})

export const { proDatas, updateProProfilePhoto } = proSlice.actions;
export default proSlice.reducer;