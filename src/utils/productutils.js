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

export const addProductwithoutimage = (body, seterr, navigate) => {
  axiosInstance
    .post("/api/v1/seller/create-product", body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      seterr("Product Added wihtout image Succesfully");
      console.log(res);
      const id = res.data.data._id;
      navigate(`/Product/${id}`);
    })
    .catch((err) => {
      //   seterr("some error caught");
    });
};

export const getoneProduct = (id, setProductdata) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/v1/seller/product/${id}`)
    .then((res) => {
      //console.log(res);
      setProductdata(res.data.data);
    }) //console.log(res))
    .catch((err) => {
      setProductdata("Not Found");
    }); //console.log(err));
};

export const getComments = (id, setReviewdata) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/v1/seller/product/comment/${id}`)
    .then((res) => {
      //console.log(res);
      setReviewdata(res.data.data.reviewdata);
    }) //console.log(res))
    .catch((err) => console.log(err)); //console.log(err));
};

export const updateProduct = (body, seterr, id, navigate) => {
  axiosInstance
    .put(`/api/v1/seller/edit/product/${id}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res);
      const id = res.data.data._id;
      navigate(`/Product/${id}`);
    })
    .catch((err) => {
      seterr("some error caught");
    });
};
export const deleteProduct = (seterr, id) => {
  axiosInstance
    .delete(`/api/v1/seller/product/delete/${id}`)
    .then((res) => {
      seterr("Product Succesfully Deleted");
    })
    .catch((err) => {
      seterr("some error caught To Delete Product");
    });
};
