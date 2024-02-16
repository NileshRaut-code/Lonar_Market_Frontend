import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../utils/productSlice.js";
import Productcart from "./Productcart.js";
import Loading from "../Loader comp/Loading.js";
const Home = () => {
  const dispatch = useDispatch();
  const allproductdata = useSelector((store) => store.products?.data);
  const productarray = [];
  console.log(productarray);
  console.log(allproductdata);
  useEffect(() => {
    if (allproductdata === null) {
      console.log("this is all product data calling");
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/v1/users/allproduct`)
        .then((res) => {
          console.log(res, "thiscaled");
          res.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          dispatch(addProduct(res.data.data));
          console.log(allproductdata);
        }) //console.log(res))
        .catch((err) => dispatch(removeProduct())); //console.log(err));
    }
  }, [allproductdata, dispatch]);

  return (
    <>
      <div className="bg-white dark:bg-gradient-to-r flex-wrap flex-col md:flex-row dark:from-gray-800 dark:via-gray-900 dark:to-black text-white min-h-screen flex items-center justify-center ">
        {!allproductdata ? (
          <Loading />
        ) : (
          allproductdata.map((data) => {
            return <Productcart key={data._id} data={data} />;
            // console.log(data);
          })
        )}
      </div>
    </>
  );
};

export default Home;
