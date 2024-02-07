import React, { useRef, useState } from "react";
import { reviewSubmit } from "../../utils/userutils";

const AddReview = (data) => {
  const [rating, setRating] = useState(0);
  console.log(data);
  const comment = useRef(null);
  const handleReview = (data) => {
    if (!comment.current.value) {
      return;
    }
    console.log(rating);
    const commentdata = { comment: comment.current.value, rating: rating };
    const body = JSON.stringify(commentdata);
    console.log(body);
    reviewSubmit(body, data);
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={(e) => e.preventDefault()} className="mt-8">
        <input
          type="text"
          ref={comment}
          className="border border-gray-300 px-4 py-2 w-64 rounded-md mr-4 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Enter your review"
        />
        <select
          value={rating}
          onChange={handleRatingChange}
          className="border border-gray-300 px-4 py-2 rounded-md mr-4 focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value={0}>Select Rating</option>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <button
          onClick={() => handleReview(data.data)}
          className="bg-gray-900 dark:bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
