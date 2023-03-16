import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialAuthState = { loggedIn: false, role: null };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
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

const initialCartState = {
  cartList: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      console.log(action.payload);
      state.cartList = [...state.cartList, action.payload];
      console.log(state.cartList);
    },
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer, cart: cartSlice.reducer },
});

export const authActions = authSlice.actions;
export const cartActions = cartSlice.actions;
export default store;
