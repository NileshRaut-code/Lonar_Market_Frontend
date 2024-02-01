import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Productcart from "../User/Productcart";
import Loading from "../Loader comp/Loading";
const Index = () => {
  const [shopData, setShopData] = useState(null);

  const { shopname } = useParams();
  console.log(shopname);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/seller/shop/${shopname}`)
      .then((res) => {
        console.log(res?.data?.data[0]);
        setShopData(res?.data?.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (shopData === undefined) {
    return (
      <div className="container h-screen w-full bg-gray-700 mx-auto ">
        <h1>No data</h1>
      </div>
    );
  }
  return shopData ? (
    <div className="bg-gray-700">
      <div
        className={`container lg:px-20 md:px-10 sm:px-5 bg-gray-700 mx-auto `}
      >
        <header className="bg-gray-800 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-white text-2xl font-bold">
                {shopData?.username}
              </h1>
              <p className="text-gray-300">{shopData?.shopDescription}</p>
            </div>
          </div>
        </header>

        {/* Shop owner information */}
        <section className="mt-4">
          <div className="flex items-center">
            <img
              src={shopData?.avatar}
              alt="Owner Avatar"
              className="w-12 h-12 rounded-full mr-2"
            />
            <div>
              <h2 className="text-xl font-bold">{shopData?.fullName}</h2>
              <p>{shopData?.email}</p>
            </div>
          </div>
          <div className="mt-4">
            <img
              src={shopData?.coverImage}
              alt="Cover Image"
              className="w-full h-32 object-cover rounded-md"
            />
          </div>
        </section>

        {/* Product listing */}

        <div className="bg-gradient-to-r flex-wrap flex-col md:flex-row from-gray-800 via-gray-900 to-black text-white min-h-screen flex items-center justify-center ">
          {/* {allproductdata.data.map((inf) => {
          <Productcart info />;
          // console.log(info);
        })} */}
          {shopData?.products.map((product) => (
            <Productcart key={product.id} data={product} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Index;
