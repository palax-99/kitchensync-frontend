import { createSlice } from "@reduxjs/toolkit";

// Leggo subito il token dal localStorage quando l'app parte
// Così se l'utente ha già fatto login prima, lo ritrova
const tokenIniziale = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: tokenIniziale || null,
    utente: null,
  },
  reducers: {
    setCredenziali: (state, action) => {
      // Salvo token e dati utente in Redux
      state.token = action.payload.token;
      state.utente = action.payload.utente;
    },
    logout: (state) => {
      // Pulisco tutto dallo stato Redux
      state.token = null;
      state.utente = null;
      // Pulisco anche il localStorage
      localStorage.removeItem("token");
    },
  },
});

export const { setCredenziali, logout } = authSlice.actions;
export default authSlice.reducer;
