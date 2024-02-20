import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../utils/cartSlice";
import AddReview from "./AddReview";
import { Link } from "react-router-dom";
const OneProductcard = (data) => {
  const logstate = useSelector((store) => store.user.status);
  const loguser = useSelector((store) => store.user.data);
  //console.log(data.data);
  const productdetail = data.data;
  const dispatch = useDispatch();
  const handlecart = (data) => {
    dispatch(
      addProduct({
        product_id: data.id,
        name: data.name,
        price: data.price,
        details: data.details,
        image: data.image,
      })
    );
  };

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={
                    productdetail.image !== ""
                      ? productdetail.image
                      : "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                  }
                  alt="Product "
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button
                    onClick={() => {
                      handlecart({
                        id: productdetail._id,
                        name: productdetail.title,
                        price: productdetail.price,
                        details: productdetail.productdescription,
                        image: productdetail.image,
                      });
                    }}
                    className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    Add to Wishlist
                  </button>
                </div>

                {loguser &&
                  loguser._id &&
                  loguser?._id === productdetail?.createdBy?._id && (
                    <div className="w-1/2 px-2">
                      <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                        <Link to={`/Product/edit/${productdetail._id}`}>
                          Edit Product
                        </Link>
                      </button>
                    </div>
                  )}
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Product Name
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {productdetail.title}
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {productdetail.price}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Availability:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {productdetail.Avaiblestock}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {productdetail.productdescription}
                </p>
              </div>
            </div>
          </div>
        </div>
        {logstate && <AddReview data={productdetail._id} />}
      </div>
    </>
  );
};

export default OneProductcard;
