import React, { useState, useEffect } from "react";
import Orderlist from "./Orderlist";
import { sellerallorder } from "../../utils/sellerutils";
import Loading from "../Loader comp/Loading.js";

const OrderManage = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Pending");

  useEffect(() => {
    sellerallorder(setAllOrders)
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  const statuses = {
    Pending: "ORDERED BUT PENDING TO DISPATCH",
    Dispatched: "DISPATCH",
    Canceled: "CANCLED",
    Delivered: "DELIVERED",
  };

  const filteredOrders = allOrders.filter(
    (order) => order.status === statuses[activeTab]
  );

  const TabButton = ({ tabName }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        activeTab === tabName
          ? "bg-indigo-600 text-white shadow"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      {tabName}
    </button>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Manage Orders</h1>
      
      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex space-x-2 sm:space-x-4 border-b border-gray-200 pb-4">
          {Object.keys(statuses).map((tab) => (
            <TabButton key={tab} tabName={tab} />
          ))}
        </div>
      </div>

      {/* Order List */}
      <div>
        {filteredOrders.length > 0 ? (
          <Orderlist data={filteredOrders} />
        ) : (
          <div className="text-center py-16 px-6 bg-white rounded-2xl shadow-lg">
            <h3 className="text-xl font-medium text-gray-800">No {activeTab} Orders Found</h3>
            <p className="mt-2 text-sm text-gray-500">
              There are currently no orders with this status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManage;
