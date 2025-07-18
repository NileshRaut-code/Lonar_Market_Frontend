import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.js";
import Home from "./components/User/Home.js";
import { Provider } from "react-redux";
import appstore from "./utils/appstore.js";
import Auth from "./auth/auth.js";
import OneProduct from "./components/User/OneProduct.js";
import Logout from "./components/Logout.js";
import DashBoard from "./components/Seller/Home.js";
import Shop from "./components/Seller/Shop.js";
import Page from "./components/User/Page.js";
import { Cartpage } from "./Cart/Cartpage.js";
import AuthSeller from "./auth/authseller.js";
import { Profile } from "./components/User/Profile.js";
import Authadmin from "./auth/authadmin.js";
import Adminpage from "./components/Admin/Adminpage.js";
import Adminchangerole from "./components/Admin/Adminchangerole.js";
import Editproduct from "./components/Seller/Editproduct.js";
import Allorder from "./components/User/Allorder.js";
import OneOrder from "./components/User/OneOrder.js";
import OrderManage from "./components/Seller/OrderManage.js";
import SalesDash from "./components/Seller/SalesDash.js";
import Reset from "./components/Reset.js";
import Forget from "./components/Forget.js";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: (
          <Auth aut={false}>
            <Login />
          </Auth>
        ),
      },
      {
        path: "/reset-password/:resetToken",
        element: (
          <Auth aut={false}>
            <Reset />
          </Auth>
        ),
      },
      {
        path: "/forget-password",
        element: (
          <Auth aut={false}>
            <Forget />
          </Auth>
        ),
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/dashboard",
        element: (
          <AuthSeller aut={true} role={"SELLER"}>
            <DashBoard />
          </AuthSeller>
        ),
      },
      {
        path: "/dashboard/sales",
        element: (
          <AuthSeller aut={true} role={"SELLER"}>
            <SalesDash />
          </AuthSeller>
        ),
      },
      {
        path: "/dashboard/orders",
        element: (
          <AuthSeller aut={true} role={"SELLER"}>
            <OrderManage />
          </AuthSeller>
        ),
      },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/Product/:id",
        element: <OneProduct />,
      },
      {
        path: "/shop/:shopname",
        element: <Shop />,
      },
      {
        path: "/page/:id",
        element: <Page />,
      },
      {
        path: "/cart",
        element: <Cartpage />,
      },
      {
        path: "/profile",
        element: (
          <Auth>
            <Profile />
          </Auth>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <Authadmin aut={true} role={"ADMIN"}>
            <Adminpage />
          </Authadmin>
        ),
      },
      {
        path: "/admin/dashboard/changerole",
        element: (
          <Authadmin aut={true} role={"ADMIN"}>
            <Adminchangerole />
          </Authadmin>
        ),
      },
      {
        path: "/Product/edit/:id",
        element: (
          <Auth>
            <Editproduct />
          </Auth>
        ),
      },
      {
        path: "/order",
        element: (
          <Auth>
            <Allorder />
          </Auth>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <Auth>
            <OneOrder />
          </Auth>
        ),
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={appstore}>
    <RouterProvider router={routes} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
