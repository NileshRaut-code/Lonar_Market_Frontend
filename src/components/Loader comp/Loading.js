import React from "react";

const Loading = () => {
  return (
    <div className="flex w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-r-4 border-b-4 border-white shadow-xl"></div>
    </div>
  );
};

export default Loading;
