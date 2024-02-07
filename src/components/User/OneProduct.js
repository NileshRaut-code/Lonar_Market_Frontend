import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loader comp/Loading";
import { useEffect } from "react";
import axios from "axios";
import OneProductcard from "./OneProductcard";
import Review from "./Review";
const OneProduct = () => {
  const { id } = useParams();
  const [Productdata, setProductdata] = useState(null);
  const [Reviewdata, setReviewdata] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/seller/product/${id}`)
      .then((res) => {
        //console.log(res);
        setProductdata(res.data.data);
      }) //console.log(res))
      .catch((err) => console.log(err)); //console.log(err));

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/seller/product/comment/${id}`
      )
      .then((res) => {
        //console.log(res);
        setReviewdata(res.data.data.reviewdata);
      }) //console.log(res))
      .catch((err) => console.log(err)); //console.log(err));
  }, [id]);

  return Productdata ? (
    <>
      <OneProductcard data={Productdata} />
      <div className="bg-gray-100 dark:bg-gray-700 py-8 px-16  text-white text-2xl">
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
