import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Set withCredentials at the instance level
});

export const createorder = (body, navigate) => {
  axiosInstance
    .post(`/api/v1/orders/create-order`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      setTimeout(() => {
        navigate(`/order/${res.data.data._id}`);
      }, 3000);
    })
    .catch((err) => console.log(err));
};

export const viewoneorder = (id, setorderedata, navigate) => {
  axiosInstance
    .get(`/api/v1/orders/view-order/${id}`)
    .then((res) => setorderedata(res.data.data[0].product_list))
    .catch((err) => {
      if (err.request.status === 404) {
        navigate("/404");
      }
    });
};

export const vieworder = (setorderedata) => {
  axiosInstance
    .get(`/api/v1/orders/view-order`)
    .then((res) => setorderedata(res.data.data))
    .catch((err) => {
      if (err.response.status === 404) {
        setorderedata("Not Found");
      }
    });
};
