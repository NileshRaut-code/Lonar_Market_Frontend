import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loader comp/Loading";
import { useEffect } from "react";
import axios from "axios";
import OneProductcard from "./OneProductcard";
const OneProduct = () => {
  const { id } = useParams();
  const [Productdata, setProductdata] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/v1/seller/product/${id}`)
      .then((res) => {
        //console.log(res);
        setProductdata(res.data.data);
      }) //console.log(res))
      .catch((err) => console.log(err)); //console.log(err));
  }, []);

  return Productdata ? <OneProductcard data={Productdata} /> : <Loading />;
};

export default OneProduct;
