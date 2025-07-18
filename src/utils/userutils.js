import axios from "axios";
import { login, logout } from "./userSlice.js";

export const Currentuser = async (dispatch) => {
  try {
    console.log("called 1");
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/users/current-user`,
      {
        withCredentials: true,
      }
    );

    if (res) {
      console.log(res);
      dispatch(login(res.data.data));
      console.log("called 2");
    } else {
      console.log("logging out called");
      dispatch(logout());
      console.log("called");
      // throw new Error("user is not loged");
    }
  } catch (err) {
    console.error("User is not logged:", err.message);
  }
  return true;
};

export const Loginuser = (
  dispatch,
  navigate,
  seterrmsg,
  email,
  password,
  setLoading
) => {
  const data = {
    email: email?.current?.value,
    password: password?.current?.value,
  };
  const body = JSON.stringify(data);
  console.log(email?.current?.value, password?.current?.value);

  axios
    .post(`${process.env.REACT_APP_API_URL}/api/v1/users/login`, body, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);

      dispatch(login(res.data.data.user));
      navigate("/");
    })
    .catch((err) => {
      setLoading(false);
     
      seterrmsg(err.response.data.message);
    });
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Set withCredentials at the instance level
});

// Use the configured instance to make requests
export const Logoutuser = (dispatch, navigate) => {
  console.log("logout kar rahe he");
  axiosInstance
    .post("/api/v1/users/logout")
    .then((res) => {
      console.log(res);
      dispatch(logout());
      navigate("/");
    })
    .catch((err) => navigate("/"));
};

export const Signupuser = (dispatch, navigate, seterrmsg, body, setLoading) => {
  console.log("called 1");
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/v1/users/register`, body, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
      dispatch(login(res.data.data));
      navigate("/");
    })
    .catch((err) => {
      
        seterrmsg(err.response.data.message);
    });
};

export const reviewSubmit = (body, id,seterrmsg) => {
  console.log(body, id);
  axiosInstance
    .post(
      `${process.env.REACT_APP_API_URL}/api/v1/seller/product/createcomment/${id}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => seterrmsg(err.response.data.message));
};

export const updateProfile = (body, seterr) => {
  axiosInstance
    .patch(`/api/v1/users/update-account`, body, {
      headers: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
    .then((res) => {
      console.log(res);
      seterr("Profile Succesfully Updated");
    })
    .catch((err) => seterr(err.response.data.message));
};

export const updateProfileimage = (body, seterr) => {
  axiosInstance
    .patch(`/api/v1/users/update-avatar`, body, {
      headers: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
    .then((res) => {
      console.log(res);
      seterr("Profile Succesfully Updated");
    })
    .catch((err) =>  seterr(err.response.data.message));
};

export const updateuserpassword = (body, seterrp) => {
  axiosInstance
    .post(`/api/v1/users/change-password`, body, {
      headers: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
    .then((res) => {
      console.log(res);
      seterrp("Password Succesfully Updated");
    })
    .catch((err) => seterrp(err.response.data.message));
};
