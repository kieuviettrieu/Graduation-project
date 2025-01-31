import React from "react";
import '../Contents/ScheduleCards.css';

const MovieItem = ({ movie }) => {
  return (
    <div className="single-movie-list">
      <div className="single-movie-list-left col-lg-3 col-md-4 col-sm-12">
        <a href={movie.link}>
          <img src={movie.poster} alt="top movie" />
        </a>
      </div>
      <div className="single-movie-list-right col-lg-9 col-md-8 col-sm-12">
        <h4>
          <a href={movie.link}>{movie.title}</a>
        </h4>
        <ul>
          {movie.ratings.map((rating, index) => (
            <li key={index} className="rating">
              {rating}
            </li>
          ))}
        </ul>
        <p className="list-genre">{movie.genre}</p>

        <div className="movie-list-info">
          <p>
            Đạo diễn: <span>{movie.director}</span>
          </p>
          <p>
            Diễn viên: <span>{movie.cast.join(", ")}</span>
          </p>
          <span>{movie.description}</span>
        </div>

        <div className="col-md-12 col-sm-12" style={{ padding: 0 }}>
          <hr className="space-1" />
          {movie.times.map((time, index) => (
            <a style={{display: 'inline-flex', marginBottom: '10px'}}>
              <span
                key={index}
                className="time past item"
                style={{ display: "inline-flex", marginBottom: "10px", justifyContent: 'center' }}
              >
                {time}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const ScheduleCards = ({ movies }) => {
  const moviesData = [
    {
      title: "Hồn Ma Xác Mẹ",
      link: "/film/hon-ma-xac-me/adf7d466-df47-440b-8f4e-49f3c4cc2d32.html",
      poster:
        "http://riocinemas.vn/Areas/Admin/Content/Fileuploads/images/poster%20web/2025/T1/H%E1%BB%92N%20MA%20X%C3%81C%20M%E1%BA%B8(1).jpg",
      ratings: ["2D Phụ Đề", "T18"],
      genre: "Kinh dị",
      director: "Awi Suryadi",
      cast: ["Davina Karamoy", "Ully Triani", "Shanty"],
      description:
        "A girl named Maya who is terrorized by various unusual things. Ironically, Maya's father died. All this terrible terror occurred after Maya's mother f...",
      times: ["09:20", "16:10", "20:25", "22:20"],
    },
    {
      title: "THÁP CƯƠNG THI",
      link: "/film/thap-cuong-thi/ae85bcbd-4564-4731-9fb9-ab2668049140.html",
      poster:
        "http://riocinemas.vn/Areas/Admin/Content/Fileuploads/images/poster%20web/2025/T1/TH%C3%81P%20C%C6%AF%C6%A0NG%20THI.jpg",
      ratings: ["2D Phụ Đề", "T18"],
      genre: "Kinh dị",
      director: "Jack Lai",
      cast: ["Philip Keung", "Candy Wong", "Wai Lun Yeung"],
      description:
        "When seven malevolent spirits are unleashed to possess the tenants of a dying mall, it falls to a jaded ex-stuntman, his headstrong daughter and a was...",
      times: ["11:10", "12:55", "15:40", "20:10"],
    },
  ];

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
            {moviesData.map((movie, index) => (
              <MovieItem key={index} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCards;
