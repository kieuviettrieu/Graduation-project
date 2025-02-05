// API base URL
export const API_BASE_URL_PUBLIC = "http://localhost:8080/api/public";

export const API_COMMON = {
  public: {
    movieDetail: API_BASE_URL_PUBLIC + "/movie/detail/{id}",
    login: API_BASE_URL_PUBLIC + "/login",
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