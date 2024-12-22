import React from "react";
import { changeroleadmin } from "../../utils/adminutils";

const UserRow = ({ data }) => {
  const handlerolechange = (data) => {
    console.log(data);
    changeroleadmin(data);
  };

  return (
    <tr className="bg-white hover:bg-blue-50">
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-800">3</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-full w-full rounded-full"
              src={data.avatar}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="whitespace-no-wrap text-gray-800 font-medium">
              {data.fullName}
            </p>
          </div>
        </div>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-700">{data.role}</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-600">
          {new Date(data.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <button
          onClick={() => {
            handlerolechange(data);
          }}
          className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
        >
          Change role to: {data.role === "USER" ? "SELLER" : "USER"}
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
