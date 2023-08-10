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
    zone: "",
    budgetMois: "",
    typeBienLoc: "",
    minSurfaceLoc: "",
    minPieceLoc: "",
    nbLoc: "",
    meuble: "",
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
    removeDatas: (state,action) => {
      state.value = {}
    }
  },
});

export const { userDatas, userDatasLoc, removeDatas } = userSlice.actions;
export default userSlice.reducer;
