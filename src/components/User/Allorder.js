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
  }, [orderdata]);

  if (orderdata == null) {
    return <Loading />;
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
              <h2 class="text-xl p-2">OrderId : {item._id}</h2>
              <p class="text-m p-2">Order Date : {item.createdAt}</p>
              <p class="text-l p-2">Total Price : {item.total_cost}</p>
              <p class="text-l p-2">Status : {item?.status}</p>
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
