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
    <tr>
      <td className="border-b border-gray-200 bg-white  dark:bg-gray-800 px-5 py-5 text-sm">
        <p className="whitespace-no-wrap">{data?._id.substring(0, 6)}</p>
      </td>
      <td className="border-b border-gray-200 bg-white dark:bg-gray-800 px-5 py-5 text-sm">
        {data?.product_id?.title.substring(0, 12)}..
      </td>
      <td className="border-b border-gray-200 bg-white dark:bg-gray-800 px-5 py-5 text-sm">
        {data?.quantity}
      </td>

      <td className="border-b border-gray-200 bg-white dark:bg-gray-800 px-5 py-5 text-sm">
        {data?.price}
      </td>
      <td className="border-b border-gray-200 bg-white dark:bg-gray-800 px-5 py-5 text-sm">
        {data.price * data.quantity}
      </td>
      <td className="border-b border-gray-200 bg-white dark:bg-gray-800 px-5 py-5 text-sm">
        {data?.status}
      </td>

      <td className="border-b border-gray-200 bg-white dark:bg-gray-800 px-5 py-5 text-sm">
        <p className="whitespace-no-wrap dark:text-gray-200">
          {new Date(data.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </td>
      <td className="border-b border-gray-200 bg-white dark:bg-gray-800 px-5 py-5 text-sm">
        {data.status === "DISPATCH" ||
        data.status === "ORDERED BUT PENDING TO DISPATCH" ? (
          <div>
            <select ref={status}>
              <option value={""}>ORDERED</option>
              <option value={"DISPATCH"}>DISPATCH</option>
              <option value={"CANCLED"}>CANCELLED</option>
              {data.status === "DISPATCH" && <option>DELIVERED</option>}
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
