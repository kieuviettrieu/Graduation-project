import { API_BASE_URL_ADMIN } from "../../../Common/Constant";

export const API_CINEMA = {
    showingCinema: API_BASE_URL_ADMIN + "/cinemas",
    addCinema: API_BASE_URL_ADMIN + "/cinema/add",
    deleteCinema: API_BASE_URL_ADMIN + "/cinema",
    getCinema: API_BASE_URL_ADMIN + "/cinema",
    updateCinema: API_BASE_URL_ADMIN + "/cinema/update",
  };