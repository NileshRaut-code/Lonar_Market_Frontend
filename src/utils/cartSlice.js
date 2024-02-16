import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // Array to store the products in the cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { _id, name, price, details, image } = action.payload;
      const existingProduct = state.products.find(
        (product) => product._id === _id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ _id, name, price, details, image, quantity: 1 });
      }
    },
    removeProduct: (state, action) => {
      const { id } = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product.id === id
      );
      if (productIndex !== -1) {
        state.products.splice(productIndex, 1);
      }
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
