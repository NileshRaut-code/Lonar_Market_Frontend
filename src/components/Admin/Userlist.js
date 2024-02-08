import React, { useState } from "react";
import { useEffect } from "react";
import UserRow from "./UserRow";

const Userlist = ({ data }) => {
  // console.log(data[0].role);
  return (
    <div className="mx-auto  max-w-screen-lg px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold dark:text-white text-gray-700">
            {data[0]?.role} Accounts
          </h2>
          <span className="text-xs dark:text-gray-400 text-gray-500">
            View accounts of registered users
          </span>
        </div>
      </div>
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Full Name</th>
                <th className="px-5 py-3">User Role</th>
                <th className="px-5 py-3">Created at</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {data.map((data) => (
                <UserRow data={data} key={data._id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Userlist;
