import { createSlice, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
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
const reducer = combineReducers({
  cart: cartSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: { auth: authSlice.reducer, cart: persistedReducer },
});

export const authActions = authSlice.actions;
export const cartActions = cartSlice.actions;
export default store;
