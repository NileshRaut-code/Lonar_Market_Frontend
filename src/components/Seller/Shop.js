import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Productcart from "../User/Productcart";
import Loading from "../Loader comp/Loading";
import NotFound from "../constantcomponets/NotFound";
const Shop = () => {
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
        setShopData("Not Found");
      });
  }, [shopname]);
  if (shopData === undefined || shopData === "Not Found") {
    //console.log("hellow", shopData);
    return <NotFound msg="Shop" />;
  }
  return shopData ? (
    <div className="bg-white dark:bg-gray-700">
      <div className="container lg:px-20 md:px-10 sm:px-5 mx-auto ">
        <header className="dark:text-white text-black p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{shopData?.username}</h1>
              <p className="text-black dark:text-gray-300">
                {shopData?.shopDescription}
              </p>
            </div>
          </div>
        </header>

        {/* Shop owner information */}
        <section className="mt-4">
          <div className="flex items-center">
            <image
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
            <image
              src={shopData?.coverImage}
              alt="Cover Image"
              className="w-full h-32 object-cover rounded-md"
            />
          </div>
        </section>

        {/* Product listing */}

        <div className="dark:bg-gradient-to-r flex-wrap flex-col md:flex-row from-gray-800 via-gray-900 to-black text-white min-h-screen flex items-center justify-center ">
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

export default Shop;
