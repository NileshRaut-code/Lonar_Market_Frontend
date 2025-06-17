import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCodOrder, createRazorpayOrder, verifyOnlinePayment } from "../utils/orderutils.js";

export const Cartpage = () => {
  const cart = useSelector((state) => state.cart);
  const userstste = useSelector((store) => store.user.status);
  const navigate = useNavigate();
  const [orderloader, Setorderloader] = useState(true);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("COD");
  const address = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      const scripts = document.querySelectorAll('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      scripts.forEach(s => document.body.removeChild(s));
    };
  }, []);
  const pincode = useRef(null);
  const [err, seterr] = useState(null);

  const totalPrice = cart.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const orderhandler = async () => {
    if (userstste === false) {
      navigate("/login");
      return;
    }

    if (!address.current.value || !pincode.current.value) {
      seterr("Address and Pincode are required.");
      return;
    }
    seterr(null);
    Setorderloader(false);

    const orderDetails = {
      products: cart.products,
      address: address.current.value,
      pincode: parseInt(pincode.current.value),
    };

    if (selectedPaymentMode === "COD") {
      try {
        await createCodOrder(JSON.stringify({ ...orderDetails, payment_mode: "COD" }));
        navigate('/order');
      } catch (error) {
        seterr('Failed to place COD order. Please try again.');
        Setorderloader(true); 
      }
      return;
    }

    if (selectedPaymentMode === "ONLINE") {
      try {
        
        const razorpayOrderResponse = await createRazorpayOrder(JSON.stringify({ products: cart.products }));
        const razorpayOrder = razorpayOrderResponse.data;

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: "Lonar MarkatePlace",
          description: "Complete Your Purchase",
          order_id: razorpayOrder.id,
          handler: async function (paymentResponse) {
            const verificationData = {
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              ...orderDetails, 
            };

            try {
              const verificationResult = await verifyOnlinePayment(JSON.stringify(verificationData));
              if (verificationResult.data.verified) {
                navigate("/order");
              } else {
                seterr("Payment verification failed. Please try again.");
                Setorderloader(true);
              }
            } catch (error) {
                seterr("An error occurred during payment verification.");
                Setorderloader(true);
            }
          },
          modal: {
            ondismiss: function () {
              seterr("Payment was cancelled.");
              Setorderloader(true);
            },
          },
          prefill: {
            name: "Customer Name",
            email: "customer.email@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Customer Address",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
            seterr(`Payment failed: ${response.error.description}`);
            Setorderloader(true);   
        });
        rzp1.open();

      } catch (error) {
        seterr("Could not connect to payment gateway. Please try again.");
        Setorderloader(true);   
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Shopping Cart
        </h1>
        {cart.products.length === 0 ? (
          <div className="text-center py-10 px-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-700">Your cart is empty</h2>
            <p className="text-gray-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
            <button onClick={() => navigate('/')} className="mt-6 inline-block bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md">
                <ul className="divide-y divide-gray-200">
                  {cart.products.map((item) => (
                    <li key={item.id} className="p-4 sm:p-6 flex items-start space-x-4">
                      <img
                        src={item.image || "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"}
                        alt={item.name}
                        className="w-20 h-20 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                        <p className="text-lg font-semibold text-gray-900 mt-2">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 lg:mt-0 lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-4">
                  Order Summary
                </h2>
                <div className="flex justify-between items-center my-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{totalPrice}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Delivery Details</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="address" className="sr-only">Address</label>
                      <input type="text" ref={address} id="address" placeholder="Full Address" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"/>
                    </div>
                    <div>
                      <label htmlFor="pincode" className="sr-only">Pincode</label>
                      <input type="text" ref={pincode} id="pincode" placeholder="Pincode" maxLength="6" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"/>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input id="cod" name="payment-type" type="radio" value="COD" checked={selectedPaymentMode === 'COD'} onChange={(e) => setSelectedPaymentMode(e.target.value)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"/>
                      <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">Cash on Delivery</label>
                    </div>
                    <div className="flex items-center">
                      <input id="online" name="payment-type" type="radio" value="ONLINE" checked={selectedPaymentMode === 'ONLINE'} onChange={(e) => setSelectedPaymentMode(e.target.value)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"/>
                      <label htmlFor="online" className="ml-3 block text-sm font-medium text-gray-700">Pay Online with Razorpay</label>
                    </div>
                  </div>
                </div>

                {err && (
                  <p className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">{err}</p>
                )}

                <div className="mt-6">
                  <button
                    onClick={orderhandler}
                    disabled={!orderloader}
                    className="w-full bg-indigo-600 text-white py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {orderloader ? (
                      selectedPaymentMode === "COD" ? "Place Order" : "Proceed to Pay"
                    ) : (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
