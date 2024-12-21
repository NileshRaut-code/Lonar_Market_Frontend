import { Link } from "react-router-dom";

const Productcart = ({ data }) => {
  return (
    <div className="relative bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2">
      <img
        src={
          data.image ||
          "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
        }
        alt="Product"
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-6">
        <h5 className="text-lg font-semibold text-gray-800 truncate">
          {data.title}
        </h5>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {data.productdescription}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-semibold text-blue-600">
            ₹{data.price}
          </span>
          <Link
            to={`/Product/${data._id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            View
          </Link>
        </div>
      </div>
      <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
        New
      </div>
    </div>
  );
};

export default Productcart;
