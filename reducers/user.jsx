import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    _id:"",
    prenom: "",
    nom: "",
    motDePasse: "",
    token: "",
    email: "",
    tel: "",
    zoneLoc: "",
    budgetMois: "",
    typeBienLoc: "",
    minSurfaceLoc: "",
    minPieceLoc: "",
    nbLoc: "",
    meuble: "",
    zoneAchat: "",
    budgetMax: "",
    typeBienAchat: "",
    minSurfaceAchat: "",
    minPieceAchat: "",
    typeInvest: "",
    recherche: "",
    situation: "",
    salaire: "",
    primo: "",
    financement: "",
    accordBanque: "",
    banqueDoc: "",
    idDoc: "",
    domDoc: "",
    contrat: "",
    salaire1: "",
    salaire2: "",
    salaire3: "",
    impots: "",
    bilan: "",
    autres: "",
    dejaInscrit: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // profilage : (state, action) => {
    //   state.value.profil = action.payload;
    // },
    userDatas: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    
    
  },
});

export const { userDatas, userDatasLoc } = userSlice.actions;
export default userSlice.reducer;
