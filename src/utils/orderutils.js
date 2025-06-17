import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accesstoken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => Promise.reject(error)
);

export const createCodOrder = async (data) => {
  try {
    const response = await axiosInstance.post(`/api/v1/orders/create-order`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating COD order:', error.response?.data || error.message);
    throw error;
  }
};

export const createRazorpayOrder = async (data) => {
  try {
    const response = await axiosInstance.post(`/api/v1/orders/create-razorpay-order`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating Razorpay order:', error.response?.data || error.message);
    throw error;
  }
};

export const verifyOnlinePayment = async (data) => {
  try {
    const response = await axiosInstance.post(`/api/v1/orders/verify-payment`, data);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error.response?.data || error.message);
    throw error;
  }
};

export const vieworder = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/orders/view-orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error.response?.data || error.message);
    throw error;
  }
};

export const viewoneorder = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/orders/view-order/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error.response?.data || error.message);
    throw error;
  }
};
