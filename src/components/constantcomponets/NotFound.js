import React from "react";

const NotFound = ({ msg }) => {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      <div className=" flex-wrap text-gray-700 min-h-screen flex items-center justify-center ">
        <h2 className="text-2xl border-r-2 p-2">404</h2>
        <span className="p-2"> This {msg} Not Found</span>
      </div>
    </div>
  );
};

export default NotFound;
