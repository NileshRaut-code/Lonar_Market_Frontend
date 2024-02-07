import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Set withCredentials at the instance level
});
export const addProduct = (body, seterr) => {
  axiosInstance
    .post("/api/v1/seller/create-product", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      seterr("Product Added Succesfully");
      //   navigate("/");
    })
    .catch((err) => {
      //   seterr("some error caught");
    });
};
