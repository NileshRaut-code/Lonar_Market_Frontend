import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loader comp/Loading";

const Authadmin = ({ children, aut = true, role }) => {
  const authstate = useSelector((store) => store?.user?.status);
  const authrole = useSelector((store) => store?.user?.data?.role);
  console.log("sttus", authstate);
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);

  useEffect(() => {
    console.log("sttus of if cond", role);
    if (authstate !== aut || authrole !== "SELLER") {
      navigate("/login?alert=Please login to access this page");
    }

    setloader(true);
  }, [authstate, navigate, aut, role]);

  return loader ? <>{children}</> : <Loading />;
};

export default Authadmin;
