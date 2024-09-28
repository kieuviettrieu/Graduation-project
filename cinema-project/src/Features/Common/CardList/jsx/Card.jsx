import * as React from "react";
import "../Content/CardList.css";
import { generateUrl, ROUTER_PATHS } from "../../Constant";

export function Card(props) {
  const { data } = props;
  
  return (
    <>
      {/* <img src="https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202408/11514_103_100003.jpg" alt="Movie Poster" /> */}
      <div className="movie-card">
        <div className="movie-image">
          {/* <img src={data?.imageUrl} alt="Movie Poster" /> */}
          <img
            src="https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202408/11514_103_100003.jpg"
            alt="Movie Poster"
          />
          <div className="overlay"></div>
          <div className="movie-buttons">
            <a href="#" className="movie-button">
              Mua vé
            </a>
            <a href={generateUrl(ROUTER_PATHS.FILM_DETAIL, {filmId: data?.id})} className="movie-button">
              Chi tiết
            </a>
          </div>
        </div>
        <div className="movie-details">
          <h3 className="movie-title">{data?.title}</h3>
          <p className="movie-genre">{data?.genre}</p>
          <p className="movie-duration">{data?.duration}</p>
          <p className="movie-release-date">{data?.releaseDate}</p>
        </div>
      </div>
    </>
  );
}
