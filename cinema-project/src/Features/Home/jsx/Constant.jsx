import { API_BASE_URL_PUBLIC } from "../../Common/Constant";

export const API_Film = {
    showingMovies: API_BASE_URL_PUBLIC + "/movie/list/onShowing",
    upComingg: API_BASE_URL_PUBLIC + "/movie/list/upcoming",
    suggession: API_BASE_URL_PUBLIC + "/movie/list/onSuggestion",
  };