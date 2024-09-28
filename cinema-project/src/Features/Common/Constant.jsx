export const ROUTER_PATHS = {
  //HOME
  HOME: "/",
  //FILM
  FILM: "/film",
  FILM_DETAIL: "film/detail/{filmId}",
  //BOOKING
  BOOKING: "/booking",
  //CORNER
  CORNER: "/corner",
  //EVENT
  EVENT: "/event",
  //USER
  USER_PROFILE: "user/profile/{userId}",
  //DASHBOARD
  DASHBOARD: "/dashboard"
};

export const generateUrl = (urlTemplate, params) => {
  let url = urlTemplate;
  for (const key in params) {
    url = url.replace(`{${key}}`, params[key]);
  }
  return url;
};
