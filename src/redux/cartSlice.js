import { createSlice } from "@reduxjs/toolkit";
import applyOffers from "../utils/applyOffers";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("ADD TO CART CALLED:", action.payload);
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id && !i.isFree);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1, isFree: false });
      }
      state.items = applyOffers(state.items);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(i => i.id !== id);
      state.items = applyOffers(state.items);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id && !i.isFree);
      if (item) {
        item.quantity = quantity;
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.id !== id);
        }
      }
      state.items = applyOffers(state.items);
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
