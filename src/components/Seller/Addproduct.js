import React, { useRef, useState } from "react";
import { addProduct, addProductwithoutimage } from "../../utils/productutils";
import { useNavigate } from "react-router-dom";

const Addproduct = () => {
  const title = useRef(null);
  const productdescription = useRef(null);
  const Avaiblestock = useRef(null);
  const productImage = useRef(null);
  const price = useRef(null);
  const [err, seterr] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

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

  function handleaddproduct() {
    seterr(null);
    console.log(productImage.current.files[0]);
    if (
      !title.current.value ||
      !productdescription.current.value ||
      !Avaiblestock.current.value ||
      !price.current.value
      // ||!productImage.current.files[0]
    ) {
      seterr("All fields are required");

      return;
    }

    if (productImage) {
      const body = new FormData();
      body.append("title", title.current.value);
      body.append("productdescription", productdescription.current.value);
      body.append("Avaiblestock", Avaiblestock.current.value);
      body.append("price", price.current.value);
      body.append("productImage", productImage.current.files[0]);
      addProduct(body, seterr, navigate);
    } else {
      const pdata = {
        title: title.current.value,
        productdescription: productdescription.current.value,
        Avaiblestock: Avaiblestock.current.value,
        price: price.current.value,
      };
      const body = JSON.stringify(pdata);
      addProductwithoutimage(body, seterr, navigate);
    }
  }

  return (
    <section className="">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Add a new product
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                ref={title}
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type product name"
                required=""
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                ref={price}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="$2999"
                required=""
              />
            </div>

            <div>
              <label
                htmlFor="item-weight"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Item Stock (No)
              </label>
              <input
                type="number"
                name="item-weight"
                id="item-weight"
                ref={Avaiblestock}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="12"
                required=""
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="8"
                ref={productdescription}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Your description here"
              ></textarea>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
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
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
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
              <label className="block text-sm font-medium text-gray-900">
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
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            {err}
          </p>
          <button
            onClick={handleaddproduct}
            className="bg-slate-500 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
          >
            Add product
          </button>
        </form>
      </div>
    </section>
  );
};

export default Addproduct;
