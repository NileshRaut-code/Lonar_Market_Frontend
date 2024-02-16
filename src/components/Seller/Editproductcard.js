import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../../utils/productutils";
const Editproductcard = ({ data }) => {
  const navigate = useNavigate();
  const userdata = useSelector((store) => store.user.data);

  const title = useRef(data.title);
  const productdescription = useRef(data.productdescription);
  const Avaiblestock = useRef(data.Avaiblestock);
  const productImage = useRef(null);
  const price = useRef(data.price);
  const [err, seterr] = useState(null);
  const [selectedImage, setSelectedImage] = useState(data.image);

  useEffect(() => {
    if (data.createdBy._id !== userdata._id) {
      navigate("/");
    }
    title.current.value = data?.title;
    productdescription.current.value = data?.productdescription;
    Avaiblestock.current.value = data?.Avaiblestock;
    price.current.value = data?.price;
  }, [data, navigate, userdata._id]);

  const handleImageChange = (e) => {
    const file = e.target?.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleupdate = () => {
    const body = new FormData();
    title.current.value && body.append("title", title.current.value);
    productdescription.current.value &&
      body.append("productdescription", productdescription.current.value);
    Avaiblestock.current.value &&
      body.append("Avaiblestock", Avaiblestock.current.value);

    productImage.current.files[0] &&
      body.append("productImage", productImage.current.files[0]);
    price.current.value && body.append("price", price.current.value);
    updateProduct(body, seterr, data._id, navigate);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit product
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                ref={title}
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required=""
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                ref={price}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                required=""
              />
            </div>

            <div>
              <label
                htmlFor="item-weight"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Item Stock (No)
              </label>
              <input
                type="number"
                name="item-weight"
                id="item-weight"
                ref={Avaiblestock}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="12"
                required=""
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="8"
                ref={productdescription}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
              ></textarea>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="image"
                type="file"
                ref={productImage}
                onChange={handleImageChange}
              />
            </label>
          </div>
          {selectedImage && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">
                Selected Image:
              </label>
              <img
                src={selectedImage}
                alt="Selected"
                className="mt-1 p-2 border rounded-md bg-slate-500"
              />
            </div>
          )}
          <p
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {err}
          </p>
          <button
            onClick={handleupdate}
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Edit product
          </button>
        </form>
      </div>
    </section>
  );
};

export default Editproductcard;
