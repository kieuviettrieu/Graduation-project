export const Cloud_Name = "df7edl9v5";
export const Upload_Preset = "my-upload-preset";



// API base URL
export const API_BASE_URL_PUBLIC = "http://localhost:8080/api/public";

export const API_COMMON = {
  public: {
    movieDetail: API_BASE_URL_PUBLIC + "/movie/detail/{id}",
    login: API_BASE_URL_PUBLIC + "/login",
  }
  
};

export const callApi = async (url, method = "GET", body = null) => {
  // const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    "Content-Type": "application/json",
    // Th�m header kh�c n?u c?n, v� d? Authorization: `Bearer ${token}`
  };

  const options = {
    method: method,
    headers: headers,
  };

  if (body) {
    options.body = JSON.stringify(body); // N?u c� body, chuy?n th�nh JSON
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`API Error: ${errorMessage || "Kh�ng th? t?i d? li?u"}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("L?i khi g?i API:", error);
    throw error; // N�m l?i ra ngo�i d? x? l� ti?p ? noi g?i h�m
  }
};

// H�m g?i API GET (d�ng cho c�c y�u c?u GET)
// export const getMoviesOnShowing = async () => {
//   return await callApi("/onShowing", "GET");
// };

// H�m g?i API POST (d�ng cho c�c y�u c?u POST)
// export const createMovie = async (movieData) => {
//   return await callApi("/create", "POST", movieData);
// };

// H�m g?i API PUT (d�ng cho c�c y�u c?u PUT)
// export const updateMovie = async (movieId, movieData) => {
//   return await callApi(`/update/${movieId}`, "PUT", movieData);
// };

// H�m g?i API DELETE (d�ng cho c�c y�u c?u DELETE)
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
};

export const ACCOUNT_ROLE = {
  USER_ROLE: 1,
  ADMIN_ROLE: 2,
  SUPER_ADMIN: 3,
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // "en-GB" formats it as dd/MM/yyyy
};