import useCommonFunctions from "./CommonFunction";

export const Cloud_Name = "df7edl9v5";
export const Upload_Preset = "my-upload-preset";



// API base URL
export const API_BASE_URL_PUBLIC = "http://localhost:8080/api/public";
export const API_BASE_URL_ADMIN = "http://localhost:8080/api/admin";
export const API_BASE_URL_ORIGIN = "http://localhost:8080/api";

export const API_COMMON = {
  public: {
    movieDetail: API_BASE_URL_PUBLIC + "/movie/detail/{id}",
    getCinemaByMovieId: API_BASE_URL_PUBLIC + "/cinemas-by-movie/{id}",
    getShowTimeByMovieAndCinema: API_BASE_URL_PUBLIC + "/showtime/showtime-by-movie-cinema/{idMovie}/{idCinema}",
    login: API_BASE_URL_PUBLIC + "/login",
    getShowTime: API_BASE_URL_ORIGIN + "/user/showtime/showtime-by-id/{id}", 
    getRoom: API_BASE_URL_ORIGIN + "/user/room/check-room/{idShowTime}", 
    getTicketByRoomAndShowTime: API_BASE_URL_ORIGIN + "/user/ticket/list-ticket-by-rom-showtime/{idRoom}/{idShowTime}",
    getUser: API_BASE_URL_ORIGIN + "/user/findByUsername/{username}",
    updateUserInfo: API_BASE_URL_ORIGIN + "/user/edit",
    addTicketCheckList: API_BASE_URL_ORIGIN + "/ticket/addTicketCheckList/{ticketId}",
    getClearTicketList: API_BASE_URL_ORIGIN + "/ticket/clearTicketCheckList",
    bookingTicket: API_BASE_URL_ORIGIN + "/user/booking-ticket",
    getTicketHistory: API_BASE_URL_ORIGIN + "/user/ticket",
    getPointHistory: API_BASE_URL_ORIGIN + "/user/point",
    changePassword: API_BASE_URL_ORIGIN + "/user/do-reset-password",
    sumPoint: API_BASE_URL_ORIGIN + "/user/sum-point",
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
  USER_PROFILE: "/user/profile",
  BOOKING: "/booking/{timeId}",
  BOOKING_CONFIRM: "/booking/confirm",
  CINEMA_CREATE: "/manage/cinema/create",
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

export const ACCOUNT_ROLE_STR = {
  USER_ROLE: "1",
  ADMIN_ROLE: "2",
  SUPER_ADMIN: "ROLE_ADMIN"
,
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // "en-GB" formats it as dd/MM/yyyy
};

export const formatDateTime = (dateString, startTime) => {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
  const year = date.getUTCFullYear();
  const start = formatTime(startTime);

  return `${start} ${day}/${month}/${year}`;
}

export const formatTime = (time) => {
   return time?.split(":").slice(0, 2).join(":");
}


