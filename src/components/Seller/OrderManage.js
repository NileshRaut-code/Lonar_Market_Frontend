import React, { useState } from "react";
import { Link } from "react-router-dom";
import Orderlist from "./Orderlist";
import { data } from "autoprefixer";
import { sellerallorder } from "../../utils/sellerutils";
import { useEffect } from "react";
import Loading from "../Loader comp/Loading.js";
const OrderManage = () => {
  const [data, setdata] = useState(null);
  useEffect(() => {
    sellerallorder(setdata);
    console.log(data);
  }, []);
  if (data === null) {
    return <Loading />;
  }
  return (
    <>
      {data && (
        <div className="dark:bg-gray-800 bg-white">
          {
            <Orderlist
              data={data.filter(
                (order) => "ORDERED BUT PENDING TO DISPATCH" === order.status
              )}
            />
          }
          {
            <Orderlist
              data={data.filter((order) => "DISPATCH" === order.status)}
            />
          }
          {
            <Orderlist
              data={data.filter((order) => "CANCLED" === order.status)}
            />
          }
          {
            <Orderlist
              data={data.filter((order) => "DELIVERED" === order.status)}
            />
          }
        </div>
      )}
    </>
  );
};

export default OrderManage;
