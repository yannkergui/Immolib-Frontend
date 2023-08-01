import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { prenom: '',
    nom: '',
    email : '',
    tel: '',
    location : {
      zoneLoc : '',
      budgetMois: '',
      typeBienLoc: '',
      minSurfaceLoc: '',
      minPieceLoc: '',
      nbLoc: '',
      meuble: '',
    },
    achat : {
      zoneAchat: '',
      budgetMax : '',
      typeBienAchat: '',
      minSurfaceAchat: '',
      minPieceAchat: '',
      typeInvest : '',
    },
    salaire : '',
    primo: '',
    financement: '',
    accordBanque: '',
    banqueDoc: '',
    documents : {
      idDoc: '',
      domDoc: '',
      contrat : '',
      salaire1: '',
      salaire2: '',
      salaire3: '',
      impots: '',
      bilan: '',
      autres : '',
    }
        },
};

export const proData = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    userDatas : (state, action) => {
      state.value = action.payload
    }
  },
});

export const { userDatas } = proData.actions;
export default proData.reducer;