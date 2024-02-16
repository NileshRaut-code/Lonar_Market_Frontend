import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editproductcard from "./Editproductcard";
import { useEffect } from "react";
import { getoneProduct } from "../../utils/productutils";
import Loading from "../Loader comp/Loading";

const Editproduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setdata] = useState(null);
  useEffect(() => {
    getoneProduct(id, setdata);
  }, [navigate, id]);

  if (data == null) {
    return <Loading />;
  }
  return <Editproductcard data={data} />;
};

export default Editproduct;
