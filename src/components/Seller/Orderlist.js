import React from "react";
import OrderRow from "./OrderRow";

const Orderlist = ({ data }) => {
  const status = data.length > 0 ? data[0]?.status : "Orders";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{status}</h2>
          <span className="text-sm text-gray-500">
            A list of all {status.toLowerCase()} in your account.
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 mt-6">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-l-lg">Order ID</th>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">Quantity</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Total Cost</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Order Date</th>
              <th scope="col" className="px-6 py-3 rounded-r-lg">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => (
              <OrderRow data={order} key={order._id} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orderlist;
