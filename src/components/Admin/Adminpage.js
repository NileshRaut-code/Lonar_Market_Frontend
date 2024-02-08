import React from "react";
import { Link } from "react-router-dom";

const Adminpage = () => {
  return (
    <div className="bg-white dark:bg-slate-800 h-screen flex items-center justify-center">
      <Link
        to={"/admin/dashboard/changerole"}
        className="bg-gray-500 text-white rounded-lg p-2 "
      >
        Change The Role of User/Seller
      </Link>
    </div>
  );
};

export default Adminpage;
