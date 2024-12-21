import React from "react";
import StarRating from "./StarRating";

const Review = (reviewdata) => {
  console.log(reviewdata);
  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Review Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 mb-6">
          <div className="flex items-start space-x-4">
            {/* User Image */}
            <div className="flex-shrink-0">
              <img
                className="h-12 w-12 rounded-full border-2 border-gray-300"
                src={reviewdata?.data?.createdBy?.avatar} // Replace with the URL of the user's avatar image
                alt="User Avatar"
              />
            </div>
            {/* User Details */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {reviewdata?.data?.createdBy?.fullName}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <StarRating rating={reviewdata?.data?.rating} />
                <span className="text-sm text-gray-500">
                  {reviewdata?.data?.rating} Stars
                </span>
              </div>
            </div>
          </div>

          {/* Comment Text */}
          <div className="mt-4">
            <p className="text-gray-700 text-base leading-relaxed">
              {reviewdata.data.review_comment}
            </p>
          </div>

          {/* Comment Date (Optional) */}
          <div className="mt-4 text-sm text-gray-500">
            <p>{reviewdata?.data?.createdAt}</p>{" "}
            {/* You can format the date if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
