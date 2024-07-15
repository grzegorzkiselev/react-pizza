import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  count: number
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<number>) {
      const isExits = state.items.find(item => item.id === action.payload);
      if (!isExits) {
        state.items.push({ id: action.payload, count: 1 });
      } else {
        isExits.count = isExits.count + 1;
      }
    },
    deleteItemFromCart(state, action: PayloadAction<number>) {
      const isExits = state.items.find(item => item.id === action.payload);
      if (isExits) {
        isExits.count = isExits.count - 1 > 0 ? isExits.count - 1 : 1;
      }
    },
    removeItemFromCart(state, action: PayloadAction<id>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;

