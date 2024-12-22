import React, { useState, useEffect } from "react";
import Loading from "../Loader comp/Loading";
import { viewoneorder } from "../../utils/orderutils";
import { useNavigate, useParams } from "react-router-dom";

const OneOrder = () => {
  const [orderdata, setorderedata] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    viewoneorder(id, setorderedata, navigate);
  }, [id, navigate]);

  if (!orderdata) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Your Order: #{id.substring(0, 6)}
      </h2>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {orderdata.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row sm:items-center py-6 border-b border-gray-300"
          >
            {/* Product Image */}
            <div className="w-full sm:w-32 sm:h-32 mb-4 sm:mb-0">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={
                  item?.product_id?.image === ""
                    ? "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                    : item?.product_id?.image
                }
                alt="Product"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 ml-0 sm:ml-6">
              <h3 className="text-xl text-gray-700 font-semibold mb-2">
                {item?.product_id?.title}
              </h3>
              <p className="text-gray-600 text-lg mb-2">
                <span className="font-medium">Price:</span> ₹{item?.price}
              </p>
              <p className="text-gray-600 text-lg mb-4">
                <span className="font-medium">Quantity:</span> {item?.quantity}
              </p>
              <a
                href={`/Product/${item?.product_id?._id}`}
                className="inline-block px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              >
                View Product
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OneOrder;
