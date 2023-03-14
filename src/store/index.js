import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { loggedIn: false, role: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.role = action.payload;
    },
    logout(state, action) {
      state.loggedIn = false;
      state.role = action.payload;
    },
  },
});

const store = configureStore({
  reducer: authSlice.reducer,
});

export const authActions = authSlice.actions;

export default store;
