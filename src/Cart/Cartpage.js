import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createorder,paymentOrder } from "../utils/orderutils";

export const Cartpage = () => {
  const cart = useSelector((state) => state.cart);
  const userstste = useSelector((store) => store.user.status);
  const navigate = useNavigate();
  const [orderloader, Setorderloader] = useState(true);
  const [paymentloader, Setpaymentloader] = useState(true);
  const address = useRef(null);
  const pincode = useRef(null);
  const payment_mode = useRef(null);
  const [err, seterr] = useState(null);
  const [paymentModel,setpaymentModel]=useState(false);
  const cardno = useRef(null);
  const cardcvv= useRef(null);
  const cardname = useRef(null);
  const cardexp = useRef(null);
  const [paymentOrderid,setpaymentOrderid]=useState(null);
  // Calculate total price
  const totalPrice = cart.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const orderhandler = () => {
    Setorderloader(false);
    if (userstste === false) {
      navigate("/login");
    }

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
    createorder(body, navigate ,setpaymentModel,setpaymentOrderid);
  };

  const handlepayment=()=>{
    Setpaymentloader(false)
    const data={orderId:paymentOrderid};
    const body = JSON.stringify(data);
    paymentOrder(body,navigate)
  }


  return (
    <div className="w-full mx-auto p-8 min-h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Your Cart
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
        {cart.products.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty</p>
        ) : (
          <div>
            {cart.products.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-b border-gray-200 py-4 hover:bg-gray-100 transition duration-200 ease-in-out"
              >
                <img
                  src={
                    item.image === ""
                      ? "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                      : item.image
                  }
                  alt="Product cart"
                  className="w-24 h-24 object-cover rounded-md mr-8 shadow-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 mb-2">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-gray-500">
                    Price: ₹ {item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-8">
              <strong className="text-xl text-gray-800">
                Total Price: ₹ {totalPrice}
              </strong>
              <button
                onClick={orderhandler}
                className="bg-blue-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              >
                {orderloader ? (
                  "Order Checkout"
                ) : (
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                )}
              </button>
            </div>
          </div>
        )}

        {cart.products.length !== 0 && (
          <div className="bg-white p-8 rounded-lg shadow-xl shadow-blue-500/50">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Delivery Details
            </h2>
            <p
              className={`mb-4 text-sm text-red-800 rounded-lg bg-red-50 p-4 ${
                err ? "" : "hidden"
              }`}
              role="alert"
            >
              {err}
            </p>
            <div className="mb-6">
              <input
                type="text"
                ref={address}
                placeholder="Enter Address"
                className="border border-gray-300 rounded-md py-2 px-4 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              />
            </div>
            <div className="mb-6">
              <input
                ref={pincode}
                maxLength="6"
                type="number"
                placeholder="Enter Pincode"
                className="border border-gray-300 rounded-md py-2 px-4 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              />
            </div>
            <div className="mb-6">
              <select
                ref={payment_mode}
                className="border border-gray-300 rounded-md py-2 px-4 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              >
                <option value="COD">Cash on Delivery</option>
                <option value="CREDITCARD">Credit Card</option>
                <option value="EMI">EMI</option>
              </select>
            </div>
          </div>
        )}
      </div>
      {paymentModel && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Complete Payment</h2>
      
      <div className="mb-6">
        <input
          ref={cardno}
          type="text"
          placeholder="Card Number"
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <input
          ref={cardcvv}
          type="text"
          placeholder="CVV"
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        />
        <input
          ref={cardexp}
          type="text"
          placeholder="Expiry Date (MM/YY)"
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        />
      </div>

      <div className="mb-6">
        <input
          ref={cardname}
          type="text"
          placeholder="Cardholder Name"
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handlepayment}
          className="bg-blue-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
          {orderloader ? (
                  "Complete Payment"
                ) : (
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                )}
        </button>
      </div>
    </div>
  </div>
)}

    </div>

 
  );
};
