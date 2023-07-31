import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { nom: '',
          token : '',
          email: '',
          profil: '' },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    profilage : (state, action) => {
      state.value.profil = action.payload;
    }
  },
});

export const { profilage } = userSlice.actions;
export default userSlice.reducer;