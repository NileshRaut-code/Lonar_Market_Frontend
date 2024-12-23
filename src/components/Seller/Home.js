import React from "react";
import { useSelector } from "react-redux";
import Addproduct from "./Addproduct";
import { Link } from "react-router-dom";

const Home = () => {
  const data = useSelector((store) => store?.user?.data);
  console.log(data);

  return (
    <>
      <div className="bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 relative">
        <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center py-6">
          {/* Left Side: Cover Image, Avatar, Name */}
          <div className="flex flex-col items-center md:items-start md:w-1/2 md:mr-8 p-6 md:p-8">
            <img
              src={data?.coverImage}
              alt="Cover"
              className="w-full h-96 object-cover rounded-lg md:w-full lg:h-96 xl:h-120 mb-6"
            />

            <div className="text-center md:text-left">
              <img
                src={data?.avatar}
                alt="Avatar"
                className="w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 rounded-full border-4 border-white mb-4"
              />
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 mt-4">
                {data?.fullName}
              </h1>
              <p className="text-lg md:text-xl">{data?.email}</p>
            </div>

   <div className="flex flex-row gap-6 items-center p-2 mt-2 md:mt-8">
              <Link
                className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2"
                to={"/dashboard/orders"}
              >
                Manage The Orders
              </Link>
              <Link
                className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2"
                to={"/dashboard/sales"}
              >
                View The Sales
              </Link>
            </div>
                  
          </div>

          {/* Right Side: Add Product Section */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            {/* Add Product Form */}
            <Addproduct />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
