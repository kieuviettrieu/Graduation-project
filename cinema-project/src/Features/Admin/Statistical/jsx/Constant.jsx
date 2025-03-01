import { API_BASE_URL_ADMIN } from "../../../Common/Constant";

export const API_STATISTICS = {
  getStatisticsFilm: API_BASE_URL_ADMIN + "/movie-statistic-list",
  getStatisticsCustomer: API_BASE_URL_ADMIN + "/customer-statistic-list",
  getStatisticsMovieType: API_BASE_URL_ADMIN + "/category-movie",

  movieDetail: API_BASE_URL_ADMIN + "/movie/detail",
  deleteMovie: API_BASE_URL_ADMIN + "/movie",
};
