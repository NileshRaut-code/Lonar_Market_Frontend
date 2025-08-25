import axios from "axios";
import { login, logout } from "./userSlice.js";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const Currentuser = async (dispatch) => {
  try {
    const res = await axiosInstance.get("/api/v1/users/current-user");

    if (res) {
      dispatch(login(res.data.data));
    } else {
      dispatch(logout());
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

  axiosInstance
    .post("/api/v1/users/login", data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      dispatch(login(res.data.data.user));
      navigate("/");
    })
    .catch((err) => {
      setLoading(false);
      seterrmsg(err.response?.data?.message || "Login failed");
    });
};

export const Signupuser = (dispatch, navigate, seterrmsg, body, setLoading) => {
  axiosInstance
    .post("/api/v1/users/register", body, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      dispatch(login(res.data.data));
      navigate("/");
    })
    .catch((err) => {
      setLoading(false);
      seterrmsg(err.response?.data?.message || "Signup failed");
    });
};

export const Logoutuser = (dispatch, navigate) => {
  axiosInstance
    .post("/api/v1/users/logout")
    .then(() => {
      dispatch(logout());
      navigate("/");
    })
    .catch(() => navigate("/"));
};

export const GoogleLoginuser = (dispatch, navigate, seterrmsg, token,setLoading) => {
  axiosInstance
    .post("/api/v1/users/google-login", { token })
    .then((res) => {
      dispatch(login(res.data.data.user));
      navigate("/");
    })
    .catch((err) => {
      setLoading(false)
      seterrmsg(err.response?.data?.message || "Google login failed");
    });
};

export const GoogleSignupuser = (
  dispatch,
  navigate,
  seterrmsg,
  token,
  password,
  phoneno,
  setLoading
) => {
  const body = { token, password, phoneno };

  axiosInstance
    .post("/api/v1/users/google-signup", body, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      dispatch(login(res.data.data.user));
      navigate("/");
    })
    .catch((err) => {
      setLoading(false)
      seterrmsg(err.response?.data?.message || "Google signup failed");
    });
};

export const reviewSubmit = (body, id, seterrmsg) => {
  axiosInstance
    .post(`/api/v1/seller/product/createcomment/${id}`, body, {
      headers: { "Content-Type": "application/json" },
    })
    .then(() => window.location.reload())
    .catch((err) => seterrmsg(err.response?.data?.message));
};

export const updateProfile = (body, seterr) => {
  axiosInstance
    .patch("/api/v1/users/update-account", body, {
      headers: { "Content-Type": "application/json" },
    })
    .then(() => seterr("Profile Succesfully Updated"))
    .catch((err) => seterr(err.response?.data?.message));
};

export const updateProfileimage = (body, seterr) => {
  axiosInstance
    .patch("/api/v1/users/update-avatar", body, {
      headers: { "Content-Type": "application/json" },
    })
    .then(() => seterr("Profile Succesfully Updated"))
    .catch((err) => seterr(err.response?.data?.message));
};

export const updateuserpassword = (body, seterrp) => {
  axiosInstance
    .post("/api/v1/users/change-password", body, {
      headers: { "Content-Type": "application/json" },
    })
    .then(() => seterrp("Password Succesfully Updated"))
    .catch((err) => seterrp(err.response?.data?.message));
};
