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
  }, [id, navigate, orderdata]);

  if (orderdata == null) {
    return <Loading />;
  }
  return (
    <div className="w-full mx-auto p-20 min-h-screen dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-8 dark:text-gray-50">
        Your Order : {id}
      </h2>

      {orderdata.map((item) => (
        <div class="text-white">
          <div class="flex items-center border-b border-gray-200 py-4">
            <img
              className="w-24 h-24 object-cover rounded-md mr-8"
              alt="order wala i"
              src={
                item?._id?.image === ""
                  ? "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                  : item?._id?.image
              }
            />
            <div class="">
              <h2 class="text-xl p-2">Product Name : {item?._id?.title}</h2>

              <p class="text-l p-2">Price : {item?.price}</p>
              <p class="text-l p-2">Quantity :{item?.quantity}</p>
              <Link className="text-l p-3" to={`/Product/${item?._id?._id}`}>
                {" "}
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
