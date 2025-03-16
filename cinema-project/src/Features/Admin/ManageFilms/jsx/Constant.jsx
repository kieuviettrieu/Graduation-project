import { API_BASE_URL_ADMIN, API_BASE_URL_PUBLIC } from "../../../Common/Constant";

export const API_FILM = {
  getMovieTypes: API_BASE_URL_ADMIN + "/movie/type",
  getMovieActors: API_BASE_URL_ADMIN + "/movie/actor",
  getMovieDirectors: API_BASE_URL_ADMIN + "/movie/director",
  getMovieStudios: API_BASE_URL_ADMIN + "/movie/studio",
  getMovies: API_BASE_URL_ADMIN + "/movie",
  getMovieAll: API_BASE_URL_ADMIN + "/movies",
  getMovieDetail: API_BASE_URL_PUBLIC + "/movie/detail",
  createMovie: API_BASE_URL_ADMIN + "/movie/add",
  updateMovie: API_BASE_URL_ADMIN + "/movie/update",
  movieDetail: API_BASE_URL_ADMIN + "/movie/detail",
  deleteMovie: API_BASE_URL_ADMIN + "/movie",
  moviesByCinemaDate: API_BASE_URL_PUBLIC + "/movie-by-cinema",
};
