import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart.slice";
import { saveState } from "./storage";
import userSlice, { JWT_PERSISTENT_STATE } from "./user.slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice
  }
});

store.subscribe(() => {
  const jwt = store.getState().user.jwt;
  saveState({ jwt }, JWT_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch