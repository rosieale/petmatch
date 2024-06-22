import axios from "axios";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("userInfo");
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
        showConfirmButton: true,
      }).then(() => {
        window.location.href = "/LoginPage";
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
