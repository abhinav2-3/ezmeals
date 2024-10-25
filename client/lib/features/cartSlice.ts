import { createSlice } from "@reduxjs/toolkit";

export interface CartDataType {
  name: string;
  imageUrl: string;
  id: string;
  qty: number;
  price: number;
  itemsize: string;
  shopId?: string;
  type?: string;
  quantity?: number;
  amount?: number;
  orderedDate?: string | undefined;
}

const initialState: { cart: Array<CartDataType> } = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { price, imageUrl, itemsize, qty, name, _id, maxQty } =
        action.payload;
      const uniqueId = `${_id}-${itemsize}`;
      const item: CartDataType = {
        id: uniqueId,
        name,
        imageUrl,
        qty,
        price,
        itemsize,
      };
      console.log(item);
      const existingItem = state.cart?.find((item) => item.id === uniqueId);
      if (existingItem) {
        state.cart = state.cart.map((item) => {
          if (item.id === uniqueId) {
            let newQty = item.qty + qty;
            if (newQty >= maxQty) {
              newQty = maxQty;
            }
            return {
              ...item,
              qty: newQty,
              price: item.price + price,
            };
          } else {
            return item;
          }
        });
      } else {
        state.cart.push(item);
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.cart = state?.cart.filter((item) => item.id !== id);
    },
    increaseQty: (state, action) => {
      console.log(state, action.payload);
    },
    decreaseQty: (state, action) => {},
    dropCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, dropCart } =
  cartSlice.actions;
export default cartSlice.reducer;
