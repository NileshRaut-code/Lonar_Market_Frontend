import React from "react";
import StarRating from "./StarRating";

const Review = ({ data }) => {
  if (!data) {
    return null;  
  }

  const { createdBy, rating, review_comment, createdAt } = data;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <div className="flex items-start space-x-4">
        <img
          className="h-12 w-12 rounded-full object-cover"
          src={createdBy?.avatar || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} // Fallback avatar
          alt={`${createdBy?.fullName}'s avatar`}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-md font-semibold text-gray-800">{createdBy?.fullName}</h4>
              <p className="text-xs text-gray-500">Posted on {formattedDate}</p>
            </div>
            <div className="flex items-center">
              <StarRating rating={rating} />
            </div>
          </div>
          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            {review_comment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Review;
