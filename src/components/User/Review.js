import React from "react";

const Review = (reviewdata) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4 items-center">
          {/* Image in a circle */}
          <div className="flex-shrink-0">
            <img
              className="h-12 w-12 rounded-full"
              src={reviewdata?.data?.createdBy?.avatar} // Replace with the URL of the user's avatar image
              alt="User Avatar"
            />
          </div>
          {/* User's full name */}
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {reviewdata?.data?.createdBy?.fullName}
              {/* Replace with the user's full name */}
            </h3>
          </div>
        </div>
        {/* Comment text box */}
        <div className="mt-4">
          <p
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"

            // Add onChange and value props if this textarea is meant to be interactive
          >
            {reviewdata.data.review_comment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Review;
