import React from "react";
import OrderRow from "./OrderRow";

const Orderlist = ({ data }) => {
  return (
    <div className="mx-auto  max-w-screen-lg px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold  text-gray-700">
            View All {data[0]?.status} Orders
          </h2>
        </div>
      </div>
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-5 py-3">Order ID</th>
                <th className="px-5 py-3">Product Name</th>
                <th className="px-5 py-3">Quantiy</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Total Cost</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Order Data</th>
                <th className="px-5 py-3">Change to</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {data.map((data, index) => (
                <OrderRow data={data} key={data._id} indxe={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orderlist;
