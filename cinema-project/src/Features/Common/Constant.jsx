// API base URL
export const API_BASE_URL_PUBLIC = "http://localhost:8080/api/public";

export const API_COMMON = {
  public: {
    movieDetail: API_BASE_URL_PUBLIC + "/movie/detail/{id}",
  }
  
};

export const callApi = async (url, method = "GET", body = null) => {
  // const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    "Content-Type": "application/json",
    // Thêm header khác nếu cần, ví dụ Authorization: `Bearer ${token}`
  };

  const options = {
    method: method,
    headers: headers,
  };

  if (body) {
    options.body = JSON.stringify(body); // Nếu có body, chuyển thành JSON
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`API Error: ${errorMessage || "Không thể tải dữ liệu"}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error; // Ném lỗi ra ngoài để xử lý tiếp ở nơi gọi hàm
  }
};

// Hàm gọi API GET (dùng cho các yêu cầu GET)
// export const getMoviesOnShowing = async () => {
//   return await callApi("/onShowing", "GET");
// };

// Hàm gọi API POST (dùng cho các yêu cầu POST)
// export const createMovie = async (movieData) => {
//   return await callApi("/create", "POST", movieData);
// };

// Hàm gọi API PUT (dùng cho các yêu cầu PUT)
// export const updateMovie = async (movieId, movieData) => {
//   return await callApi(`/update/${movieId}`, "PUT", movieData);
// };

// Hàm gọi API DELETE (dùng cho các yêu cầu DELETE)
// export const deleteMovie = async (movieId) => {
//   return await callApi(`/delete/${movieId}`, "DELETE");
// };

export const ROUTER_PATHS = {
  //HOME
  HOME: "/",
  //FILM
  FILM: "/film",
  FILM_DETAIL: "film/detail/{filmId}",
  //BOOKING
  FILM_SCHEDULE: "/schedule",
  FILM_SCHEDULE_DETAIL: "/schedule/detail/{scheduleId}",
  //CORNER
  CORNER: "/corner",
  //EVENT
  EVENT: "/event",
  //USER
  USER_PROFILE: "user/profile/{userId}",
  BOOKING: "/booking/{timeId}",
  //DASHBOARD
  DASHBOARD: "/dashboard",

  LOGIN: "/login",
  REGISTER: "/register",
};

export const generateUrl = (urlTemplate, params) => {
  let url = urlTemplate;
  for (const key in params) {
    url = url.replace(`{${key}}`, params[key]);
  }
  return url;
};

export const getZoomBy = (width) => {
  return window.innerWidth / width >= 1 ? 1 : window.innerWidth / width;
}

export const ACCOUNT_ROLE = {
  USER_ROLE: 1,
  ADMIN_ROLE: 2,
  SUPER_ADMIN: 3,
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // "en-GB" formats it as dd/MM/yyyy
};