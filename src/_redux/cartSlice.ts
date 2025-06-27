import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string; 
  category: string;
  size: string;
  color: string;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}
const initialState: CartState = {
  items: [],
  isCartOpen: false,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find((item) => {
        return item.id === action.payload.id;
      });

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    increaseQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromCart(state, action) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    toogleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    eraseCart(state) {
      state.items = [];
    },
  },
});
export const {
  toogleCart,
  closeCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  eraseCart,
} = cartSlice.actions;

export default cartSlice.reducer;
