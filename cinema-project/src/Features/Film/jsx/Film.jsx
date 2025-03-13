import { CardList } from "../../Common/CardList/jsx/CardList";
import React, { useState, useEffect } from "react";
import "../Contents/Film.css";
import { API_Film } from "../../Home/jsx/Constant";
import { callAPI } from "../../axios/axiosInstance";
import { useLoading } from "../../../LoadingProvider";
import { useParams } from "react-router-dom";

const Film = () => {
  const [moviesReal, setMoviesReal] = useState([]);
  const { setLoading } = useLoading();
  const { movieType } = useParams();

  useEffect(() => {
    console.log(movieType, "movieType")
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let apiStr = API_Film.showingMovies;
        if (movieType === '1') {
          apiStr = API_Film.showingMovies;
        } else if (movieType === '2') {
          apiStr = API_Film.upComingg;
        }
        const movieData = await callAPI("get", apiStr);
        setMoviesReal(movieData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [movieType]);

  return (
    <div className="auto-container">
      <CardList movies={moviesReal} />
    </div>
  );
};

export default Film;
