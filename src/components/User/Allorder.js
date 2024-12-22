import React, { useState, useEffect } from "react";
import { vieworder } from "../../utils/orderutils";
import { Link } from "react-router-dom";

const Allorder = () => {
  const [orderdata, setorderedata] = useState(null);

  useEffect(() => {
    vieworder(setorderedata);
  }, []);

  if (orderdata == null) {
    // Skeleton loading while data is being fetched
    return (
      <div className="w-full mx-auto p-6 sm:p-20 min-h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800 ">
          Your Orders
        </h2>

        {/* Skeleton loader for order card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 animate-pulse ">
          <div className="">
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-4">
              <div className="w-full sm:w-24 sm:h-24 bg-gray-300 rounded-md mr-8"></div>
              <div className="w-full sm:w-2/3">
                <div className="h-10 bg-gray-300 rounded-md mb-4"></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                </div>
                <div className="mt-6">
                  <div className="h-8 bg-gray-300 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 animate-pulse ">
          <div className="">
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-4">
              <div className="w-full sm:w-24 sm:h-24 bg-gray-300 rounded-md mr-8"></div>
              <div className="w-full sm:w-2/3">
                <div className="h-10 bg-gray-300 rounded-md mb-4"></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                </div>
                <div className="mt-6">
                  <div className="h-8 bg-gray-300 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 animate-pulse ">
          <div className="">
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-4">
              <div className="w-full sm:w-24 sm:h-24 bg-gray-300 rounded-md mr-8"></div>
              <div className="w-full sm:w-2/3">
                <div className="h-10 bg-gray-300 rounded-md mb-4"></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                  <div className="h-8 bg-gray-300 rounded-md"></div>
                </div>
                <div className="mt-6">
                  <div className="h-8 bg-gray-300 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orderdata === "Not Found") {
    return (
      <div className="bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 min-h-screen flex flex-col items-center justify-center text-gray-700">
        <h2 className="text-3xl mb-4">NO ORDER FOUND</h2>
        <p className="text-lg">Looks like you haven't made any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 sm:p-20 min-h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800 ">
        Your Orders
      </h2>

      {orderdata.map((item) => (
        <div
          className="bg-white rounded-lg shadow-lg p-6 mb-6 hover:shadow-xl transition duration-300 ease-in-out"
          key={item._id}
        >
          <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-4">
            <img
              alt="Ordered Product"
              className="w-full sm:w-24 sm:h-24 object-cover rounded-md mr-8"
              src={
                item?.product_id?.image === ""
                  ? "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                  : item?.product_id?.image
              }
            />
            <div className="w-full sm:w-2/3">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                <span className="text-gray-500">Order ID: </span>#
                {item._id.substring(0, 6)}
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <p className="text-lg">
                  <span className="text-gray-500">Order Date: </span>
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-lg">
                  <span className="text-gray-500">Total Price: </span>₹
                  {item.total_cost}
                </p>
                <p className="text-lg">
                  <span className="text-gray-500">Status: </span>
                  {item?.status}
                </p>
                <p className="text-lg">
                  <span className="text-gray-500">Payment Mode: </span>
                  {item?.payment_mode}
                </p>
                <p className="text-lg">
                  <span className="text-gray-500">Address: </span>
                  {item?.address}
                </p>
                <p className="text-lg">
                  <span className="text-gray-500">Pincode: </span>
                  {item?.pincode}
                </p>
              </div>

              <div className="mt-6">
                <Link
                  className="inline-block py-2 px-6 text-lg text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                  to={`/order/${item._id}`}
                >
                  View/Track Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Allorder;
