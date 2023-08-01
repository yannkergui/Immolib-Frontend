import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { prenom : '',
          nom: '',
          motDePasse : '',
          token : '',
          email: '',
          tel : '',
          // profil: '' 
        },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // profilage : (state, action) => {
    //   state.value.profil = action.payload;
    // },
    userDatas : (state, action) => {
      state.value = action.payload
    }
  },
});

export const { userDatas } = userSlice.actions;
export default userSlice.reducer;