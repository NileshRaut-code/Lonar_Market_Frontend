import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../utils/productSlice.js";
import Productcart from "./Productcart.js";

const Home = () => {
  const dispatch = useDispatch();
  const allproductdata = useSelector((store) => store.products?.data);
  const [searchTerm, setSearchTerm] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (allproductdata === null || allproductdata.length === 0) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/v1/users/allproduct`)
        .then((res) => {
          res.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          dispatch(addProduct(res.data.data));
        })
        .catch(() => dispatch(removeProduct()));
    } else {
      setFilteredProducts(allproductdata);
    }
  }, [allproductdata, dispatch]);

  // Handle search filter
  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);

    if (keyword) {
      const filtered = allproductdata.filter(
        (product) => product.title.toLowerCase().includes(keyword) // Assuming "title" is the product field you're searching
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allproductdata);
    }
  };

  if (!allproductdata || allproductdata.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50">
        {/* Hero Section with Skeleton Loader */}
        <div className="relative bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white py-20">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12">
            {/* Hero Title Skeleton */}
            <div className="h-12 w-72 bg-gray-300 animate-pulse rounded-md mb-6"></div>
            {/* Hero Description Skeleton */}
            <div className="h-6 w-96 bg-gray-300 animate-pulse rounded-md mb-8"></div>
            {/* Hero Buttons Skeleton */}
            <div className="flex space-x-4">
              <div className="h-12 w-32 bg-gray-300 animate-pulse rounded-lg"></div>
              <div className="h-12 w-32 bg-gray-300 animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Skeleton Loader for Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              {/* Skeleton Image */}
              <div className="h-64 bg-gray-300 rounded-t-lg"></div>
              {/* Skeleton Content */}
              <div className="px-5 py-5">
                <div className="h-6 bg-gray-300 rounded-md mb-2"></div>{" "}
                {/* Title Skeleton */}
                <div className="h-4 bg-gray-300 rounded-md mb-4"></div>{" "}
                {/* Description Skeleton */}
                <div className="h-8 bg-gray-300 rounded-md"></div>{" "}
                {/* Price Button Skeleton */}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12">
          <h1 className="text-6xl font-extrabold mb-6 animate-fade-in">
            Welcome to Your Dream Store!
          </h1>
          <p className="text-lg font-medium mb-8 max-w-2xl animate-fade-in animation-delay-200">
            Find top-quality products that match your style and needs. Shop with
            confidence, knowing you’ll get the best deals here.
          </p>
          <div className="flex space-x-4">
            <button className="bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-400 animate-fade-in animation-delay-400">
              Shop Now
            </button>
            <button className="bg-red-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-red-400 animate-fade-in animation-delay-400">
              Explore Deals
            </button>
          </div>
        </div>
        <style>
          {`
      .animate-fade-in {
        opacity: 0;
        transform: translateY(10px);
        animation: fadeIn 1s ease forwards;
      }
      .animation-delay-200 {
        animation-delay: 0.2s;
      }
      .animation-delay-400 {
        animation-delay: 0.4s;
      }
      @keyframes fadeIn {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}
        </style>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center md:justify-between px-6 py-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <div className="mt-4 md:mt-0 flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Filter
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
            Sort by Price
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-10">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((data) => (
            <Productcart key={data._id} data={data} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
