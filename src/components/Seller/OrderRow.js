import React, { useRef } from "react";
import { sellermanageorder } from "../../utils/sellerutils";

const OrderRow = ({ data }) => {
  const status = useRef(null);
  const handlerolechange = (status, _id) => {
    console.log(status.current.value, _id);
    if (
      status.current.value == null ||
      status.current.value == "" ||
      _id == null
    ) {
      console.log("required value to edit");
      return;
    }
    const data = { _id: _id, status: status.current.value };
    const body = JSON.stringify(data);
    console.log(data);
    sellermanageorder(body);
  };
  return (
    <tr className="text-gray-800">
      <td className="border-b border-gray-200 bg-white   px-5 py-5 text-sm">
        <p className="whitespace-no-wrap">{data?._id.substring(0, 6)}</p>
      </td>
      <td className="border-b border-gray-200 bg-white font-medium  px-5 py-5 text-sm">
        {data?.productDetails?.title.substring(0, 12)}..
      </td>
      <td className="border-b border-gray-200 bg-white  px-5 py-5 text-sm">
        {data?.quantity}
      </td>

      <td className="border-b border-gray-200 bg-white  px-5 py-5 text-sm">
        {data?.price}
      </td>
      <td className="border-b border-gray-200 bg-white  px-5 py-5 text-sm">
        {data.price * data.quantity}
      </td>
      <td className="border-b border-gray-200 bg-white  px-5 py-5 text-sm">
        {data?.status}
      </td>

      <td className="border-b border-gray-200 bg-white  px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-600">
          {new Date(data.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </td>
      <td className="border-b border-gray-200 bg-white  px-5 py-5 text-sm">
        {data.status === "DISPATCH" ||
        data.status === "ORDERED BUT PENDING TO DISPATCH" ? (
          <div>
            <select ref={status}>
              {data.status === "DISPATCH" && (
                <option value={""}>ORDERED</option>
              )}

              {data.status === "ORDERED BUT PENDING TO DISPATCH" && (
                <option value={"DISPATCH"}>DISPATCH</option>
              )}

              <option value={"CANCLED"}>CANCELLED</option>
              <option>DELIVERED</option>
            </select>

            <button
              onClick={() => {
                handlerolechange(status, data._id);
              }}
            >
              Submit
            </button>
          </div>
        ) : (
          <p>No Edit</p>
        )}
      </td>
    </tr>
  );
};

export default OrderRow;
