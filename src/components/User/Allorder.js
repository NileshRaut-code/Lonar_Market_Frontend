import React, { useState } from "react";
import Loading from "../Loader comp/Loading";
import { vieworder } from "../../utils/orderutils";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Allorder = () => {
  const [orderdata, setorderedata] = useState(null);
  useEffect(() => {
    vieworder(setorderedata);
    console.log(orderdata);
  }, []);

  if (orderdata == null) {
    return <Loading />;
  }
  if (orderdata === "Not Found") {
    return (
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black">
        <div className=" flex-wrap flex-col   text-white min-h-screen flex items-center justify-center ">
          <h2 className="text-3xl">NO ORDER FOUND </h2>
          <p className="">Looks like you haven`t made your order yet</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full mx-auto p-3 sm:p-20 min-h-screen dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-8 dark:text-gray-50">Your Order</h2>
      {/* Map lago do for all order user have */}
      {orderdata.map((item) => (
        <div class="text-white ">
          <div class="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 py-4">
            <img
              alt="orderd wala page"
              className="w-full sm:w-24 sm:h-24 object-cover rounded-md mr-8"
              src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
            />
            <div class="">
              <h2 class="text-xl p-2">
                <span className="text-gray-500">OrderId : </span> #
                {item._id.substring(0, 6)}
              </h2>
              <p class="text-m p-2">
                <span className="text-gray-500">Order Date :</span>
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p class="text-l p-2">
                <span className="text-gray-500">Total Price :</span> ₹
                {item.total_cost}
              </p>
              <p class="text-l p-2">
                <span className="text-gray-500">Status :</span> {item?.status}
              </p>
              <Link className="text-l p-3" to={`/order/${item._id}`}>
                {" "}
                View/Track Order
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Allorder;
