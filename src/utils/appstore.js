import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
const appstore = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
  },
});
export default appstore;
