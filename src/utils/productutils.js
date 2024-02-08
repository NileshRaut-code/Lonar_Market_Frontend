import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Set withCredentials at the instance level
});
export const addProduct = (body, seterr, navigate) => {
  axiosInstance
    .post("/api/v1/seller/create-product", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      seterr("Product Added Succesfully");
      console.log(res);
      const id = res.data.data._id;
      navigate(`/Product/${id}`);
    })
    .catch((err) => {
      //   seterr("some error caught");
    });
};
