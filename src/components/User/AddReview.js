import React, { useRef, useState } from "react";
import { reviewSubmit } from "../../utils/userutils";

const AddReview = ({ data, setShowReviewModal }) => {
  const [rating, setRating] = useState(0);
  const comment = useRef(null);

  const handleReview = () => {
    if (!comment.current.value) {
      return;
    }
    const commentdata = { comment: comment.current.value, rating: rating };
    const body = JSON.stringify(commentdata);
    reviewSubmit(body, data);
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-gray-800">
            Add Your Review
          </h3>
          <button
            onClick={() => {
              /* Close the popup */
              setShowReviewModal(false);
            }}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="mt-4 space-y-4">
          <div className="flex flex-col">
            <label className="text-lg text-gray-700 mb-2" htmlFor="comment">
              Review Comment:
            </label>
            <input
              type="text"
              id="comment"
              ref={comment}
              className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your review"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg text-gray-700 mb-2" htmlFor="rating">
              Rating:
            </label>
            <select
              id="rating"
              value={rating}
              onChange={handleRatingChange}
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>Select Rating</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <button
              onClick={handleReview}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
