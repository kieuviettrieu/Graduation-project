import React, { useEffect, useState } from "react";
import "../Contents/ScheduleCards.css";
import { useLoading } from "../../../LoadingProvider";
import { callAPI } from "../../axios/axiosInstance";
import { API_CINEMA } from "../../Admin/ManageCinema/jsx/Constant";
import { API_FILM } from "../../Admin/ManageFilms/jsx/Constant";
import { formatTime, generateUrl, ROUTER_PATHS } from "../../Common/Constant";

const MovieItem = ({ movie, date }) => {
  const isTimeGreaterThanNow = (timeString) => {
    const [inputHours, inputMinutes] = timeString.split(":").map(Number);
    
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    return inputHours > currentHours || (inputHours === currentHours && inputMinutes > currentMinutes);
  }; 
  const isDateTimeGreaterThanNow = (timeString, dateString) => {
    const [inputHours, inputMinutes] = timeString.split(":").map(Number);
    const [day, month, year] = dateString.split("/").map(Number);

    const inputDateTime = new Date(year, month - 1, day, inputHours, inputMinutes);
    const now = new Date();

    return inputDateTime > now;
};
  const sortedShowTimes = movie?.showTimes
    ?.filter((show) => !show.movie?.isDelete)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
  return (
    <div className="single-movie-list">
      <div className="single-movie-list-left col-lg-3 col-md-4 col-sm-12">
        <a
          href={generateUrl(ROUTER_PATHS.FILM_DETAIL, {
            filmId: movie?.id,
          })}
        >
          <img src={movie?.image} alt="top movie" />
        </a>
      </div>
      <div className="single-movie-list-right col-lg-9 col-md-8 col-sm-12">
        <h4>
          <a
            href={generateUrl(ROUTER_PATHS.FILM_DETAIL, {
              filmId: movie?.id,
            })}
          >
            {movie?.name}
          </a>
        </h4>
        {/* <ul>
          {movie.ratings.map((rating, index) => (
            <li key={index} className="rating">
              {rating}
            </li>
          ))}
        </ul> */}
        <p className="list-genre">{movie?.movieType}</p>

        <div className="movie-list-info">
          <p>
            Đạo diễn: <span>{movie?.directors}</span>
          </p>
          <p>
            Diễn viên: <span>{movie?.actors}</span>
          </p>
          <span>{movie?.description}</span>
        </div>

        <div className="col-md-12 col-sm-12" style={{ padding: 0 }}>
          <hr className="space-1" />
          {sortedShowTimes &&
            sortedShowTimes.map((time, index) => {
              const isAllowed = isDateTimeGreaterThanNow(formatTime(time?.startTime), date);
              return (
              <a
                style={{ display: "inline-flex", marginBottom: "10px" }}
                href={isAllowed && generateUrl(ROUTER_PATHS.BOOKING, {
                  timeId: time?.id,
                })}
              >
                <span
                  key={index}
                  // className="time item"
                  className={isAllowed ? "time item" : "time past item"}
                  style={{
                    display: "inline-flex",
                    marginBottom: "10px",
                    justifyContent: "center",
                  }}
                >
                  {formatTime(time?.startTime)}
                </span>
              </a>
            )})}
        </div>
      </div>
    </div>
  );
};

const ScheduleCards = ({ cinemaId, date }) => {
  const { setLoading } = useLoading();
  const [movies, setMovies] = useState([]);

  const convertDateFormat = (dateString) => {
    const [day, month, year] = dateString.split("/");
    const monthData = month.length === 1 ? "0" + month : month;
    const dayData = day.length === 1 ? "0" + day : day;
    return `${year}-${monthData}-${dayData}`;
  };
  useEffect(() => {
    const fetchScheduleData = async () => {
      setLoading(true);
      try {
        const movies = await callAPI("post", API_FILM.moviesByCinemaDate, {
          cinemaId: cinemaId,
          date: convertDateFormat(date?.date),
        });
        setMovies(movies);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, [cinemaId, date]);

  return (
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane fade show active"
        id="pills-popular-0"
        role="tabpanel"
        aria-labelledby="pills-popular-tab-0"
      >
        <div className="tab-movies movie-list-box">
          <div>
            {movies.map((movie, index) => (
              <MovieItem key={index} movie={movie} date={date?.date} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCards;
