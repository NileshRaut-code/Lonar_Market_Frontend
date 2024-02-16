import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loader comp/Loading";
import { useEffect } from "react";
import OneProductcard from "./OneProductcard";
import Review from "./Review";
import { getComments, getoneProduct } from "../../utils/productutils";
const OneProduct = () => {
  const { id } = useParams();
  const [Productdata, setProductdata] = useState(null);
  const [Reviewdata, setReviewdata] = useState(null);

  useEffect(() => {
    getoneProduct(id, setProductdata);
    getComments(id, setReviewdata);
  }, [id]);

  return Productdata ? (
    <>
      <OneProductcard data={Productdata} />
      <div className="bg-gray-100 dark:bg-gray-700 py-8 px-16  dark:text-white text-black text-2xl">
        Customer Review on {Productdata.title}
      </div>
      {Reviewdata &&
        Reviewdata.map((data) => <Review data={data} key={data._id} />)}
    </>
  ) : (
    <Loading />
  );
};

export default OneProduct;
