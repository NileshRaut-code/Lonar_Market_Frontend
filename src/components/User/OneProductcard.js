import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../utils/cartSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddReview from "./AddReview";

const OneProductcard = (data, totalReviews, averageRating) => {
  const logstate = useSelector((store) => store.user.status);
  const loguser = useSelector((store) => store.user.data);
  const productdetail = data.data;

  const dispatch = useDispatch();
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    console.log(totalReviews);
  }, [totalReviews]);

  const handlecart = (data) => {
    dispatch(
      addProduct({
        product_id: data.id,
        name: data.name,
        price: data.price,
        details: data.details,
        image: data.image,
      })
    );
  };

  const handleAddReview = () => {
    if (logstate) {
      setShowReviewModal(true);
    } else {
      alert("Please login to add a review.");
    }
  };

  const handleCloseReviewModal = () => {
    console.log("clicked");

    setShowReviewModal(false);
  };

  return (
    <>
      <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Product Image Section */}
            <div className="md:flex-1 flex flex-col items-center px-6 py-6">
              <div className="relative w-full max-w-md rounded-lg bg-gray-100 overflow-hidden mb-4">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={
                    productdetail.image !== ""
                      ? productdetail.image
                      : "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                  }
                  alt={productdetail.title}
                />
              </div>
            </div>

            {/* Product Information Section */}
            <div className="md:flex-1 px-6 py-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                {productdetail.title}
              </h2>

              <div className="flex items-center space-x-2 mb-4">
                <span className="text-green-600 font-semibold"></span>
                <span className="text-sm text-gray-600">3,318 ratings</span>
                <span className="text-sm text-gray-600">(266 reviews)</span>
              </div>

              <div className="flex items-center mb-4">
                <span className="text-lg font-semibold text-gray-600 line-through">
                  {productdetail.originalPrice}
                </span>
                <span className="text-2xl font-bold text-red-600 ml-2">
                  {productdetail.price}
                </span>
                <span className="text-sm text-gray-500 ml-2">90% off</span>
              </div>

              <div className="flex space-x-4 mb-6">
                {/* Add to Cart Button */}
                <button
                  onClick={() => {
                    handlecart({
                      id: productdetail._id,
                      name: productdetail.title,
                      price: productdetail.price,
                      details: productdetail.productdescription,
                      image: productdetail.image,
                    });
                  }}
                  className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold shadow-md hover:bg-orange-600"
                >
                  Add to Cart
                </button>
                {/* Buy Now Button */}
                <button className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold shadow-md hover:bg-blue-600">
                  Buy Now
                </button>
              </div>

              {/* Available Offers */}
              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <div>
                  Bank Offer: 5% Unlimited Cashback on Flipkart Axis Bank Credit
                  Card
                </div>
                <div>
                  Bank Offer: 12% off up to ₹1,000 on HDFC Bank Credit Card
                </div>
                <div>Special Price: Get at flat ₹489</div>
              </div>

              {/* Pincode Section */}
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  placeholder="Enter delivery pincode"
                  className="border-2 border-gray-300 rounded-lg py-2 px-4 w-full"
                />
                <button className="ml-4 px-6 py-2 bg-gray-300 text-gray-700 rounded-lg">
                  Check
                </button>
              </div>

              {/* Add Review Button */}
              {logstate && (
                <button
                  onClick={handleAddReview}
                  className="mt-4 text-blue-500 hover:underline"
                >
                  Add Review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Review Modal */}
      {logstate && (
        <div>
          {showReviewModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl relative max-w-md w-full ">
                <div onClick={handleCloseReviewModal}>close</div>

                <AddReview
                  data={productdetail._id}
                  setShowReviewModal={setShowReviewModal}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OneProductcard;
