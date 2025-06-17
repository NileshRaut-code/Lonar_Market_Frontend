import React, { useState, useEffect } from "react";
import { vieworder } from "../../utils/orderutils";
import { Link } from "react-router-dom";

const Allorder = () => {
  const [orderdata, setorderedata] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await vieworder();
        setorderedata(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setorderedata([]);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "DISPATCH":
        return "bg-blue-100 text-blue-800";
      case "CANCLED":
        return "bg-red-100 text-red-800";
      case "ORDERED BUT PENDING TO DISPATCH":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (orderdata === null) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="h-9 w-1/4 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4 sm:p-6 animate-pulse">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                    <div className="h-4 bg-gray-200 rounded w-64"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-200 mr-4 sm:mr-6"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 rounded w-24 sm:hidden"></div>
                    </div>
                    <div className="hidden sm:block h-6 w-24 bg-gray-200 rounded"></div>
                  </div>
                   <div className="mt-4 flex justify-between items-center">
                      <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">Your Orders</h1>
        
        {orderdata.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="mt-1 text-sm text-gray-500">Looks like you haven't placed any orders.</p>
            <div className="mt-6">
              <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                </svg>
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orderdata.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div className="mb-4 sm:mb-0">
                      <p className="text-sm text-gray-500">Order <span className="font-medium text-gray-900">#{item._id.substring(0, 8)}</span></p>
                      <p className="text-sm text-gray-500 mt-1">Placed on <span className="font-medium text-gray-900">{new Date(item.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                    </div>
                    <Link to={`/order/${item._id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-500 self-start sm:self-center">
                      View Details
                    </Link>
                  </div>
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="flex items-center">
                      <img
                        src={item?.product_id?.image || "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"}
                        alt={item?.product_id?.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover mr-4 sm:mr-6"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 hover:text-indigo-600">
                          <Link to={`/product/${item.product_id._id}`}>{item?.product_id?.title}</Link>
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                        <p className="text-md font-bold text-gray-900 sm:hidden mt-2">₹{item.price * item.quantity}</p>
                      </div>
                      <div className="hidden sm:block text-right">
                        <p className="text-lg font-bold text-gray-900">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                     <div className="mt-4 flex justify-between items-center">
                        <p className={`inline-flex rounded-full px-3 py-1 text-xs sm:text-sm font-semibold ${getStatusColor(item.status)}`}>
                          {item.status}
                        </p>
                        {/* Note: Cancel Order functionality is not implemented */}
                        <button disabled className="text-sm font-medium text-gray-400 cursor-not-allowed">
                          Cancel Order
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Allorder;
