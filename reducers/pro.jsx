import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { _id : '',
          prenom : '',
          nom: '',
          email: '',
          tel : '',
          motDePasse : '',
          token: '',
          photo: '',
          agence: {
            denomination: '',
            siren: '',
            siret: '',
            dateCreation: '',
            adresse :'',
          }
        },
};

export const proSlice = createSlice({
  name: 'pro',
  initialState,
  reducers: {
    // profilage : (state, action) => {
    //   state.value.profil = action.payload;
    // },
    proDatas : (state, action) => {
      state.value = action.payload
    }
  },
});

export const { proDatas } = proSlice.actions;
export default proSlice.reducer;