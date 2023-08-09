import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { 
    //prenom: '',
    // nom: '',
    // email : '',
    // tel: '',
    // location : {
    //   zoneLoc : '',
    //   budgetMois: '',
    //   typeBienLoc: '',
    //   minSurfaceLoc: '',
    //   minPieceLoc: '',
    //   nbLoc: '',
    //   meuble: '',
    // },
    // achat : {
    //   zoneAchat: '',
    //   budgetMax : '',
    //   typeBienAchat: '',
    //   minSurfaceAchat: '',
    //   minPieceAchat: '',
    //   typeInvest : '',
    // },
    // salaire : '',
    // primo: '',
    // financement: '',
    // accordBanque: '',
    // banqueDoc: '',
    // documents : {
    //   idDoc: '',
    //   domDoc: '',
    //   contrat : '',
    //   salaire1: '',
    //   salaire2: '',
    //   salaire3: '',
    //   impots: '',
    //   bilan: '',
    //   autres : '',
    // }
        },
};

export const monClientSlice = createSlice({
  name: 'monClient',
  initialState,
  reducers: {
    userDatas : (state, action) => {
      state.value = action.payload
    }
  },
});

export const { userDatas } = monClientSlice.actions;
export default monClientSlice.reducer;