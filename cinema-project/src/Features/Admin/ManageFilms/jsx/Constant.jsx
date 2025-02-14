import { API_BASE_URL_ADMIN } from "../../../Common/Constant";

export const API_FILM = {
  getMovieTypes: API_BASE_URL_ADMIN + "/movie/types",
  getMovieActors: API_BASE_URL_ADMIN + "/movie/actors",
  getMovieDirectors: API_BASE_URL_ADMIN + "/movie/directors",
  getMovies: API_BASE_URL_ADMIN + "/movies",
  createMovie: API_BASE_URL_ADMIN + "/movie/create",
  updateMovie: API_BASE_URL_ADMIN + "/movie/update",
  movieDetail: API_BASE_URL_ADMIN + "/movie/detail",
  deleteMovie: API_BASE_URL_ADMIN + "/movie",
};
