import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToWishlist", (state, action) => {
      const item = action.payload;
      const isItemExist = state.wishlist.find((i) => i._id === item._id);
      
      if (isItemExist) {
        // Naye Redux Toolkit mein direct array map/replace kar sakte hain
        state.wishlist = state.wishlist.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        // Direct push chalega, spread operator ki zaroorat nahi
        state.wishlist.push(item);
      }
    })
    .addCase("removeFromWishlist", (state, action) => {
      // Direct filter kar ke modify kar sakte hain
      state.wishlist = state.wishlist.filter((i) => i._id !== action.payload);
    });
});
