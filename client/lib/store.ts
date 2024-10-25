import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import menuReducer from "./features/menuSlice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    cart: cartReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
