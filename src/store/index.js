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
      // state.role = action.payload;
      state.role = null;
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
      const id = Object.keys(action.payload)[0];
      let flag = 1;
      // console.log("after flag", );
      const newarr = [...state.cartList];
      for (let a = 0; a < state.cartList.length; a++) {
        if (id === Object.keys(state.cartList[a])[0]) {
          console.log("Addddddddddddddddddddddddddd");
          newarr[a][Object.keys(newarr[a])[0]] += 1;
          console.log("new arr updated", newarr, Object.values(newarr[a])[0]);
          state.cartList = newarr;
          flag = 0;
        }
      }
      if (flag) {
        state.cartList = [...state.cartList, action.payload];
      }

      console.log("in add to cart", state.cartList);
    },
    removefromcart(state, action) {
      console.log(action.payload);
      const id = Object.keys(action.payload)[0];
      console.log("iddddddddddddddddd", id);
      const newarr = [...state.cartList];
      let flag = 1;
      for (let a = 0; a < state.cartList.length; a++) {
        if (id === Object.keys(state.cartList[a])[0]) {
          console.log("here");
          if (Object.values(state.cartList[a])[0] === 1) {
            const firsthalf = newarr.slice(0, a);
            const secondhalf = newarr.slice(a + 1, newarr.length);
            state.cartList = [...firsthalf, ...secondhalf];
            return;
          } else {
            console.log("Removeeeeeeeeee");
            newarr[a][Object.keys(newarr[a])[0]] -= 1;
            console.log("new arr updated", newarr, Object.values(newarr[a])[0]);
            state.cartList = newarr;
            flag = 0;
          }
        }
      }
    },
    removeCart(state) {
      state.cartList = [];
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
