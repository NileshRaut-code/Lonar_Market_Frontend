import { Link } from "react-router-dom";
const Productcart = (data) => {
  console.log(data);
  return (
    <>
      <div className="w-full  max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div>
          <img
            className="w-full h-full md:w-120 md:h-64 p-8 rounded-t-lg"
            src={
              data.data.image === ""
                ? "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                : data.data.image
            }
            alt="Product"
          />
        </div>
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {data.data.title.length > 30
              ? data.data.title.substring(0, 30) + "..."
              : data.data.title}
          </h5>
          <p className="text-black dark:text-white">
            {data.data.productdescription.length > 40
              ? data.data.productdescription.substring(0, 40) + "..."
              : data.data.productdescription}
          </p>
          <h4 className="font-bold mb-2">
            {data.data.createdBy.username && (
              <Link to={`/shop/${data.data.createdBy.username}`}>
                Seller: {data.data.createdBy.username}
              </Link>
            )}
          </h4>
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              {/* Replicate other rating stars here */}
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              5.0
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ₹ {data.data.price}
            </span>
            <Link
              to={`/Product/${data.data._id}`}
              className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              View Product
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Productcart;
