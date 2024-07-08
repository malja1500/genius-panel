import axios from "axios";
import toast from "react-hot-toast";

import { getItem, removeItem } from "../common/storage.services";

const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL,
});

const onSuccess = (response) => {
  return response;
};

const onError = (err) => {
  err.response.data.ErrorMessage.map((errorMessage) => {
    toast.error(errorMessage);
  });

  if (err.response.status === 401) {
    toast.error("لطفا وارد شوید !");

    removeItem("token");

    window.location.pathname = "/login";
  }

  Promise.reject(err);
};

instance.interceptors.request.use((opt) => {
  const token = getItem("token");

  if (token && token !== null) opt.headers.Authorization = `Bearer ${token}`;
  return opt;
});
instance.interceptors.response.use(onSuccess, onError);

export default instance;
