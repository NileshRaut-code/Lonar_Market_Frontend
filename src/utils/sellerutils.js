import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Set withCredentials at the instance level
});

export const sellerallorder = async (setdata) => {
  try {
    const res = await axiosInstance.get(`/api/v1/seller/allorder`);
    setdata(res.data);
  } catch (err) {
    console.log(err);
  }
};
export const sellermanageorder = async (body) => {
  try {
    const res = await axiosInstance.put(`/api/v1/seller/order/confirm`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Succesfull", res.data);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};
