import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    // 1. Handle Add to Cart
    .addCase("addToCart", (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);

      if (isItemExist) {
        // Direct Mutation via Immer: Simply swap the item at its index
        const index = state.cart.findIndex((i) => i._id === isItemExist._id);
        state.cart[index] = item;
      } else {
        // Direct Mutation via Immer: Simply push the item into the array
        state.cart.push(item);
      }
    })
    
    // 2. Handle Remove from Cart
    .addCase("removeFromCart", (state, action) => {
      // Reassigning state property directly is fully supported in RTK
      state.cart = state.cart.filter((i) => i._id !== action.payload);
    });
});
