import React from "react";
import { changeroleadmin } from "../../utils/adminutils";

const UserRow = ({ data }) => {
  const handlerolechange = (data) => {
    console.log(data);

    changeroleadmin(data);
  };
  return (
    <tr>
      <td className="border-b border-gray-200 bg-white  dark:bg-gray-800 px-5 py-5 text-sm">
        <p className="whitespace-no-wrap">3</p>
      </td>
      <td className="border-b border-gray-200 bg-white dark:bg-gray-800 px-5 py-5 text-sm">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-full w-full rounded-full"
              src={data.avatar}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="whitespace-no-wrap dark:text-gray-200">
              {data.fullName}
            </p>
          </div>
        </div>
      </td>
      <td className="border-b border-gray-200 bg-white dark:bg-gray-800 px-5 py-5 text-sm">
        <p className="whitespace-no-wrap dark:text-gray-200">{data.role}</p>
      </td>
      <td className="border-b border-gray-200 bg-white dark:bg-gray-800 px-5 py-5 text-sm">
        <p className="whitespace-no-wrap dark:text-gray-200">
          {new Date(data.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </td>

      <td className="border-b border-gray-200 bg-white dark:bg-gray-800 px-5 py-5 text-sm">
        <button
          onClick={() => {
            handlerolechange(data);
          }}
        >
          Change role to : {data.role == "USER" ? "SELLER" : "USER"}
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
