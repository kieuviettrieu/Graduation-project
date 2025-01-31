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