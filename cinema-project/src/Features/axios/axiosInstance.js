import axios from 'axios';

// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com/', // Thay thế bằng URL của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để đính kèm token vào header Authorization
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
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
        localStorage.removeItem('token'); // Xóa token nếu hết hạn
        window.location.href = '/login'; // Chuyển hướng về trang đăng nhập
      }
      return Promise.reject(error);
    }
  );

export default axiosInstance;
