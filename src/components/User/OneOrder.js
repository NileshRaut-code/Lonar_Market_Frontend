import React, { useState } from "react";
import Loading from "../Loader comp/Loading";
import { viewoneorder } from "../../utils/orderutils";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const OneOrder = () => {
  const [orderdata, setorderedata] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    viewoneorder(id, setorderedata, navigate);
    console.log(orderdata);
  }, []);

  if (orderdata == null) {
    return <Loading />;
  }
  return (
    <div className="w-full mx-auto p-3 sm:p-20 min-h-screen dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-8 dark:text-gray-50">
        Your Order : #{id.substring(0, 6)}
      </h2>

      {orderdata.map((item) => (
        <div class="text-white">
          <div class="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 py-4">
            <img
              className="w-full sm:w-24 sm:h-24 object-cover rounded-md mr-8"
              alt="order wala i"
              src={
                item?.product_id?.image === ""
                  ? "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                  : item?.product_id?.image
              }
            />
            <div class="">
              <h2 class="text-xl p-2">
                <span className="text-gray-500">Product Name : </span>{" "}
                {item?.product_id?.title}
              </h2>

              <p class="text-l p-2">
                <span className="text-gray-500">Price :</span> ₹{item?.price}
              </p>
              <p class="text-l p-2">
                <span className="text-gray-500">Quantity : </span>{" "}
                {item?.quantity}
              </p>
              <Link
                className="text-l p-3"
                to={`/Product/${item?.product_id?._id}`}
              >
                View Product
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OneOrder;
