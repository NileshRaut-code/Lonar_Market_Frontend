import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OneProductcard from "./OneProductcard";
import Review from "./Review";
import { getComments, getoneProduct } from "../../utils/productutils";

const OneProduct = () => {
  const { id } = useParams();
  const [Productdata, setProductdata] = useState(null);
  const [Reviewdata, setReviewdata] = useState(null);

  useEffect(() => {
    getComments(id, setReviewdata);
    getoneProduct(id, setProductdata);
  }, [id]);

  return Productdata ? (
    <div className="bg-gray-100 min-h-screen">
      {/* Product Details */}

      {Productdata === "Not Found" ? (
        <div className="bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 min-h-screen flex flex-col items-center justify-center text-gray-700">
          <h2 className="text-3xl mb-4">NO Product FOUND</h2>
          <p className="text-lg">Looks like Product Doesnot Exist.</p>
        </div>
      ) : (
        <OneProductcard data={Productdata} Review={Reviewdata} />
      )}

      {/* Customer Reviews */}
      <div className="py-10 px-16 text-2xl font-semibold text-gray-800">
        <h2>Customer Reviews for {Productdata.title}</h2>
      </div>
      {Reviewdata &&
        Reviewdata.map((data) => <Review data={data} key={data._id} />)}
    </div>
  ) : (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skeleton for Product Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center space-x-6">
            {/* Skeleton for Product Image Section */}
            <div className="md:flex-1 flex flex-col items-center px-6 py-6">
              <div className="relative w-full max-w-md h-64 bg-gray-300 rounded-lg mb-4"></div>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* Skeleton for Product Information Section */}
            <div className="md:flex-1 px-6 py-6">
              <div className="h-8 bg-gray-300 w-3/4 mb-4"></div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-4 bg-gray-300 w-16"></div>
                <div className="h-4 bg-gray-300 w-16"></div>
                <div className="h-4 bg-gray-300 w-16"></div>
              </div>
              <div className="flex items-center mb-4">
                <div className="h-6 bg-gray-300 w-20 rounded-md mr-2"></div>
                <div className="h-8 bg-gray-300 w-32 rounded-md"></div>
                <div className="h-4 bg-gray-300 w-20 rounded-md ml-2"></div>
              </div>
              <div className="flex space-x-4 mb-6">
                <div className="w-full h-12 bg-gray-300 rounded-full"></div>
                <div className="w-full h-12 bg-gray-300 rounded-full"></div>
              </div>

              {/* Skeleton for Available Offers */}
              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <div className="h-4 bg-gray-300 w-3/4"></div>
                <div className="h-4 bg-gray-300 w-2/3"></div>
                <div className="h-4 bg-gray-300 w-1/2"></div>
              </div>

              {/* Skeleton for Pincode Section */}
              <div className="flex items-center mb-4">
                <div className="w-full h-10 bg-gray-300 rounded-md"></div>
                <div className="ml-4 w-20 h-10 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneProduct;
