

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

interface WishlistState {
  favouritesByUser: {
    [userId: string]: Product[];
  };
}

const initialState: WishlistState = {
  favouritesByUser: {},
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(
      state,
      action: PayloadAction<{ userId: string; product: Product }>
    ) {
      const { userId, product } = action.payload;
      if (!state.favouritesByUser[userId]) {
        state.favouritesByUser[userId] = [];
      }

      const exists = state.favouritesByUser[userId].some(
        (item) => item.id === product.id
      );
      if (!exists) {
        state.favouritesByUser[userId].push(product);
      }
    },
    removeFromWishlist(
      state,
      action: PayloadAction<{ userId: string; productId: number }>
    ) {
      const { userId, productId } = action.payload;
      if (state.favouritesByUser[userId]) {
        state.favouritesByUser[userId] = state.favouritesByUser[userId].filter(
          (item) => item.id !== productId
        );
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
