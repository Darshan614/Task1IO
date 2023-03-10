import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { loggedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
  },
});

const store = configureStore({
  reducer: authSlice.reducer,
});

export const authActions = authSlice.actions;

export default store;
