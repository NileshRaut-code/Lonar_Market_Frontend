import React, { useEffect, useState } from "react";
import Userlist from "./Userlist";
import { getsellerdataAdmin, getuserdataAdmin } from "../../utils/adminutils";
import Loading from "../Loader comp/Loading";

const Adminchangerole = () => {
  const [alluser, setuser] = useState(null);
  const [allseller, setseller] = useState(null);
  useEffect(() => {
    getuserdataAdmin(setuser);
    getsellerdataAdmin(setseller);
  }, []);
  if (alluser == null || allseller == null) {
    return <Loading />;
  }
  return (
    <div className="dark:bg-gray-800 bg-white">
      <Userlist data={alluser} />

      <Userlist data={allseller} />
    </div>
  );
};

export default Adminchangerole;
