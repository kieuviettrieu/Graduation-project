import { API_BASE_URL_ADMIN, API_BASE_URL_PUBLIC } from "../../../Common/Constant";

export const API_ROOM = {
  showingRooms: API_BASE_URL_ADMIN + "/roomByCinemaId",
  addRoom: API_BASE_URL_ADMIN + "/addRoom",
  getMovieDetail: API_BASE_URL_PUBLIC + "/movie/detail",
  updateRoom: API_BASE_URL_ADMIN + "/updateRoom"
};
