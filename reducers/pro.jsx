import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { raisonSociale : '',
          Siret: null,
          prenom : '',
          nom: '',
          email: '',
          tel : '',
          motDePasse : '',
          token : '',
          numRue: '',
          rue: '',
          codePostal : null,
          photo: '',
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