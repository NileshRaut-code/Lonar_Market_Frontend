import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Set withCredentials at the instance level
});
export const getuserdataAdmin = (setuser) => {
  axiosInstance
    .get("/api/v1/admin/Dashboard/users")
    .then((res) => {
      //console.log(res.data.data.Data);
      setuser(res.data.data.Data);
      //   navigate("/");
    })
    .catch((err) => {
      //   seterr("some error caught");
    });
};

export const getsellerdataAdmin = (setseller) => {
  axiosInstance
    .get("/api/v1/admin/Dashboard/sellers")
    .then((res) => {
      //console.log(res);
      setseller(res.data.data.Data);
      //   navigate("/");
    })
    .catch((err) => {
      //   seterr("some error caught");
    });
};

export const changeroleadmin = (data) => {
  console.log(data._id);

  const change_role = data.role === "USER" ? "SELLER" : "USER";
  console.log(change_role);
  const jsondata = {
    id: data._id,
    change_role: change_role,
  };
  console.log(jsondata);
  const body = JSON.stringify(jsondata);
  axiosInstance
    .post(`/api/v1/admin/changerole`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
      window.location.reload();
      //   setseller(res.data.data.Data);
      //   navigate("/");
    })
    .catch((err) => {
      //   seterr("some error caught");
    });
};
