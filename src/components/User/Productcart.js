import { Link } from "react-router-dom";
const Productcart = (data) => {
  console.log(data);
  return (
    <>
      <div className=" md:h-64 md:w-[30%] h-128 w-[90%] m-5  md:ml-2 bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding-box bg-white  border border-opacity-20 border-gray-300 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">{data.data.title}</h2>
        <p className="text-gray-300 mb-4">{data.data.productdescription}</p>
        <h4 className="font-bold mb-2">
          {data.data.createdBy.username && (
            <Link to={`/shop/${data.data.createdBy.username}`}>
              Seller : {data.data.createdBy.username}
            </Link>
          )}
        </h4>

        <Link
          to={`/Product/${data.data._id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Buy Now
        </Link>
      </div>
    </>
  );
};

export default Productcart;