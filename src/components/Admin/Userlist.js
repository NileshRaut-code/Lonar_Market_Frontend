import React from "react";
import UserRow from "./UserRow";

const Userlist = ({ data }) => {
  return (
    <div className="w-full mx-auto p-6 sm:p-20 min-h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="text-2xl font-semibold  text-gray-700">
              {data[0]?.role} Accounts
            </h2>
            <span className="text-xs  text-gray-500">
              View accounts of registered users
            </span>
          </div>
        </div>

        <div className="overflow-y-hidden rounded-lg border shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
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
                {data.map((userData) => (
                  <UserRow data={userData} key={userData._id} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userlist;
