import React, { useState, useEffect } from "react";
import Loading from "../Loader comp/Loading";
import { viewoneorder } from "../../utils/orderutils";
import { useNavigate, useParams } from "react-router-dom";

const StatusBadge = ({ status }) => {
  const statusClasses = {
    "ORDERED BUT PENDING TO DISPATCH": "bg-yellow-100 text-yellow-800",
    "DISPATCH": "bg-blue-100 text-blue-800",
    "DELIVERED": "bg-green-100 text-green-800",
    "CANCLED": "bg-red-100 text-red-800",
  };
  const statusText = {
    "ORDERED BUT PENDING TO DISPATCH": "Pending",
    "DISPATCH": "Dispatched",
    "DELIVERED": "Delivered",
    "CANCLED": "Canceled",
  };
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        statusClasses[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {statusText[status] || status}
    </span>
  );
};

const OneOrder = () => {
  const [orderdata, setOrderData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await viewoneorder(id);
        setOrderData(response.data);
      } catch (error) {
        console.error(`Failed to fetch order ${id}:`, error);
        if (error.response?.status === 404) {
          navigate("/404");
        }
      }
    };
    fetchOrder();
  }, [id, navigate]);

  if (!orderdata) {
    return <Loading />;
  }

  const { product_id, price, quantity, payment_mode, payment_status, status, address, createdAt } = orderdata;
  const subtotal = price * quantity;
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 pb-6 border-b">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
              <p className="text-sm text-gray-500">Order #{id}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <StatusBadge status={status} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column: Product & Address */}
            <div className="w-full md:w-2/3">
              <div className="flex items-start space-x-4 mb-8">
                <img
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                  src={product_id?.image || "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"}
                  alt={product_id?.title}
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">{product_id?.title}</h2>
                  <p className="text-sm text-gray-500">Qty: {quantity}</p>
                  <p className="text-lg font-bold text-indigo-600 mt-2">₹{price.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Shipping Address</h3>
                  <p className="text-gray-600">{address.address}, {address.city}, {address.state} - {address.pincode}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Order Date</h3>
                  <p className="text-gray-600">{new Date(createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Price Summary */}
            <div className="w-full md:w-1/3 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Price Summary</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-2">Payment</h3>
                <p className="text-gray-600">{payment_mode} ({payment_status})</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneOrder;
