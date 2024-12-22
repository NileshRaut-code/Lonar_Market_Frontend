import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    return <NotFound msg="Shop" />;
  }

  return shopData ? (
    <div className=" bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 min-h-screen">
      <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-20">
        {/* Shop Header */}
        <header className="py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 ">
                {shopData?.username}
              </h1>
              <p className="text-gray-600  mt-2">{shopData?.shopDescription}</p>
            </div>
            <div>
              <img
                src={shopData?.avatar}
                alt="Owner Avatar"
                className="w-16 h-16 rounded-full shadow-lg"
              />
            </div>
          </div>
        </header>

        {/* Shop Owner Information */}
        <section className="flex items-center mt-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-6 rounded-lg">
          <img
            src={shopData?.coverImage}
            alt="Cover Image"
            className="w-full h-48 object-cover rounded-md mb-4 md:mb-0 md:w-2/3"
          />
          <div className="md:w-1/3 ml-6">
            <h2 className="text-xl font-semibold">{shopData?.fullName}</h2>
            <p className="text-gray-400 mt-2">{shopData?.email}</p>
          </div>
        </section>

        {/* Product Listing */}
        <section className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Products Available
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shopData?.products?.length > 0 ? (
              shopData?.products.map((product) => (
                <Productcart key={product.id} data={product} />
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300">
                No products available at the moment.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Shop;
