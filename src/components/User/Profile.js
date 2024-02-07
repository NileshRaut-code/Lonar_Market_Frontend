import React from "react";
import { useSelector } from "react-redux";

export const Profile = () => {
  const data = useSelector((store) => store.user.data);
  return (
    <div className="h-screen  bg-white dark:bg-gray-800">
      <div className="container transform duration-200 easy-in-out">
        <div className=" h-64 overflow-hidden">
          <img className="w-full" src={data?.coverImage} alt="bg" />
        </div>
        <div className="flex justify-center -mt-12">
          <img
            className="h-32 w-32  p-2 rounded-full"
            src={data?.avatar}
            alt="ava"
          />
        </div>
        <div className="">
          <div className="text-center px-14">
            <h2 className="text-gray-800 dark:text-white text-3xl font-bold">
              {data.fullName}
            </h2>
          </div>
        </div>
      </div>
      <div className="container">a</div>
    </div>
  );
};
