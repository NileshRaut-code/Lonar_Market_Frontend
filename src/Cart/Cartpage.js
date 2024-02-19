import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createorder } from "../utils/orderutils";

export const Cartpage = () => {
  const cart = useSelector((state) => state.cart);
  const userstste = useSelector((store) => store.user.status);
  const navigate = useNavigate();
  const [orderloader, Setorderloader] = useState(true);
  // Assuming your cart state is stored in the Redux store
  const address = useRef(null);
  const pincode = useRef(null);
  const payment_mode = useRef(null);
  const [err, seterr] = useState(null);
  //console.log(cart);
  // Calculate total price
  //const totalPrice = 100;
  const totalPrice = cart.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const orderhandler = () => {
    Setorderloader(false);
    if (userstste === false) {
      navigate("/login");
    }
    // if (cart.length === 0) {
    //   navigate("/");
    // }
    //
    if (
      !address.current.value ||
      !payment_mode.current.value ||
      !pincode.current.value
    ) {
      Setorderloader(true);
      seterr("All details are required");
      return;
    }
    const data = {
      products: cart.products,
      address: address.current.value,
      payment_mode: payment_mode.current.value,
      pincode: parseInt(pincode.current.value),
    };
    console.log(data);
    const body = JSON.stringify(data);
    createorder(body, navigate);
  };

  return (
    <div className="w-full mx-auto p-20 min-h-screen dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-8 dark:text-gray-50">Your Cart</h2>
      <div className="grid sm:grid-cols-2">
        {cart.products.length === 0 ? (
          <p className="dark:text-gray-50">Your cart is empty</p>
        ) : (
          <div>
            {cart.products.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-b border-gray-200 py-4"
              >
                <img
                  src={
                    item.image === ""
                      ? "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                      : item.image
                  }
                  alt="Product cart"
                  className="w-24 h-24 object-cover rounded-md mr-8"
                />
                <div>
                  <h3 className="text-lg font-bold mb-2 dark:text-gray-100">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-200 mb-2">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-gray-500 dark:text-gray-200">
                    Price: ₹ {item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-8">
              <strong className="text-xl dark:text-gray-50">
                Total Price: ₹ {totalPrice}
              </strong>
              <button
                onClick={orderhandler}
                className="bg-gray-900 dark:bg-gray-600 text-white py-2 px-6 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
              >
                {orderloader ? (
                  "Checkout"
                ) : (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                )}
              </button>
            </div>
          </div>
        )}
        {cart.products.length !== 0 && (
          <div className="p-8">
            <h2 className="text-xl font-bold mb-4 dark:text-gray-50">
              Delivery Details
            </h2>
            <p
              className={
                "mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" +
                (err ? " p-4" : "")
              }
              role="alert"
            >
              {err}
            </p>
            <div className="mb-4">
              <input
                type="text"
                ref={address}
                placeholder="Enter Address"
                className="border border-gray-300 rounded-md py-2 px-4 w-full dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div className="mb-4">
              <input
                ref={pincode}
                maxLength="6"
                type="number"
                placeholder="Enter Pincode"
                className="border border-gray-300 rounded-md py-2 px-4 w-full dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div className="mb-4">
              <select
                ref={payment_mode}
                className="border border-gray-300 rounded-md py-2 px-4 w-full dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="COD">Cash on Delivery</option>
                <option value="CREDITCARD">Credit Card</option>
                <option value="EMI">EMI</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
