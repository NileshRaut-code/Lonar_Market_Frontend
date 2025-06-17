import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loading;
