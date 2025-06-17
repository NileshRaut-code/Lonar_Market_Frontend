import React, { useState } from "react";
import { sellermanageorder } from "../../utils/sellerutils";


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

const OrderRow = ({ data }) => {
  const [newStatus, setNewStatus] = useState("");

  const handleStatusChange = () => {
    if (!newStatus || !data._id) {
      console.log("Required value to edit");
      return;
    }
    const body = JSON.stringify({ _id: data._id, status: newStatus });
    sellermanageorder(body);
  };

  const availableStatuses = {
    "ORDERED BUT PENDING TO DISPATCH": ["DISPATCH", "CANCLED"],
    "DISPATCH": ["DELIVERED", "CANCLED"],
  };

  const possibleStatusChanges = availableStatuses[data.status] || [];

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        #{data?._id.substring(0, 6)}...
      </td>
      <td className="px-6 py-4">{data?.productDetails?.title}</td>
      <td className="px-6 py-4 text-center">{data?.quantity}</td>
      <td className="px-6 py-4">₹{data?.price.toLocaleString('en-IN')}</td>
      <td className="px-6 py-4">₹{(data.price * data.quantity).toLocaleString('en-IN')}</td>
      <td className="px-6 py-4">
        <StatusBadge status={data?.status} />
      </td>
      <td className="px-6 py-4">
        {new Date(data.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </td>
      <td className="px-6 py-4">
        {possibleStatusChanges.length > 0 ? (
          <div className="flex items-center space-x-2">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Status</option>
              {possibleStatusChanges.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button
              onClick={handleStatusChange}
              disabled={!newStatus}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Update
            </button>
          </div>
        ) : (
          <span className="text-gray-400">No actions</span>
        )}
      </td>
    </tr>
  );
};

export default OrderRow;
