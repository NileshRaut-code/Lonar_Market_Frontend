import React from "react";

const NotFound = ({ msg }) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className=" flex-wrap    text-white min-h-screen flex items-center justify-center ">
        <h2 className="text-2xl border-r-2 p-2">404</h2>
        <span className="p-2"> This {msg} Not Found</span>
      </div>
    </div>
  );
};

export default NotFound;
