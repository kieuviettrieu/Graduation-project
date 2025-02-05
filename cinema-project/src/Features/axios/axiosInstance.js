import axios from "axios";

// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: "https://api.example.com/", // Thay thế bằng URL của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để đính kèm token vào header Authorization
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Xử lý token hết hạn (401 Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token"); // Xóa token nếu hết hạn
      window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
    }
    return Promise.reject(error);
  }
);

export const callAPI = async (method, url, data = null, params = null) => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axiosInstance({
      method,
      url,
      data,
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(`Error calling API ${url}:`, error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export default axiosInstance;
