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
import Authadmin from "./auth/authadmin.js";
import { Profile } from "./components/User/Profile.js";
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
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/dashboard",
        element: (
          <Authadmin aut={true} role={"SELLER"}>
            <DashBoard />
          </Authadmin>
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
