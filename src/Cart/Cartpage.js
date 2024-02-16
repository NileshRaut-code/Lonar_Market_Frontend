import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createorder } from "../utils/orderutils";

export const Cartpage = () => {
  const cart = useSelector((state) => state.cart);
  const userstste = useSelector((store) => store.user.status);
  const navigate = useNavigate();
  const [orderloader, Setorderloader] = useState(true);
  // Assuming your cart state is stored in the Redux store
  console.log(cart);
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
    const data = { products: cart.products };
    const body = JSON.stringify(data);
    createorder(body, navigate);
  };

  return (
    <div className="w-full mx-auto p-20 min-h-screen dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-8 dark:text-gray-50">Your Cart</h2>

      {cart.products.length === 0 ? (
        <p className="dark:text-gray-50">Your cart is empty</p>
      ) : (
        <div>
          {cart.products.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b border-gray-200 py-4"
            >
              {console.log(item)}
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
    </div>
  );
};
