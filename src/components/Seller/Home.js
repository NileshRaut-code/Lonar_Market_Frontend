import React from "react";
import { useSelector } from "react-redux";
import Addproduct from "./Addproduct";
import { Link } from "react-router-dom";

const Home = () => {
  const data = useSelector((store) => store?.user?.data);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative">
            <img
              src={data?.coverImage || 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=2070&auto=format&fit=crop'}
              alt="Cover"
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-24 left-10">
              <img
                src={data?.avatar || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-white shadow-md"
              />
            </div>
          </div>
          <div className="pt-20 pb-8 px-10">
            <h1 className="text-3xl font-bold text-gray-800">{data?.fullName}</h1>
            <p className="text-md text-gray-500">{data?.email}</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard/orders"
                className="w-full sm:w-auto flex-grow text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-md"
              >
                Manage Orders
              </Link>
              <Link
                to="/dashboard/sales"
                className="w-full sm:w-auto flex-grow text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-md"
              >
                View Sales
              </Link>
            </div>
          </div>
        </div>

        {/* --- Add Product Section --- */}
        <div>
          <Addproduct />
        </div>
      </div>
    </div>
  );
};

export default Home;
