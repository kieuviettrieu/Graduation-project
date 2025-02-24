import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardTheater from "./CardTheater";
import "../Contents/Film.css";
import { API_COMMON, formatDate, generateUrl } from "../../Common/Constant";
import { callAPI } from "../../axios/axiosInstance";
import { useLoading } from "../../../LoadingProvider";

const FilmDetail = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [cinemas, setCinemas] = useState(null);
  const [tabs, setTabs] = useState(null);
  const { filmId } = useParams();
  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const movieDetail = await callAPI("get", generateUrl(API_COMMON.public.movieDetail, {id : filmId}));
        const cinemaData = await callAPI("get", generateUrl(API_COMMON.public.getCinemaByMovieId, {id : filmId}));
        setMovieDetails(movieDetail);
        setCinemas(cinemaData);
        const tabs = [
          {
            id: "prod-details",
            title: "Mô tả",
            content: movieDetails?.description,
          },
        ];
        setTabs(tabs);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  if (!movieDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="film-detail-section">
      <div className="auto-container">
        <div className="row clearfix">
          {/* Images Column */}
          <div className="images-column col-lg-4 col-md-4 col-sm-12">
            <div className="inner-column">
              <div className="shop-gallery-tabs">
                <div className="gallery-tabs tabs-box">
                  <div className="tabs-content">
                    <div className="tab active-tab" id="gallery-one">
                      <div className="content">
                        <div className="image">
                          <img
                            src={movieDetails.image}
                            alt={movieDetails.name}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-column col-lg-8 col-md-8 col-sm-12">
            <div className="inner-column">
              <h4>
                {movieDetails.name} <i style={{ fontSize: "13px" }}></i>
              </h4>
              <p>
                {movieDetails.movieTypes} - {movieDetails.movieStudios}
              </p>
              <p
                style={{
                  background: "#ffe53d",
                  width: "35px",
                  height: "35px",
                  textAlign: "center",
                  lineHeight: "35px",
                  borderRadius: "5px",
                  color: "black",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  boxShadow: "1px 1px 5px 2px #4e4e54",
                }}
              >
                {movieDetails?.avgRating || "P"}
              </p>
              <hr />

              <ul className="shop-list">
                <li className="mg-l0">
                  Đạo diễn: <a>{movieDetails?.directors}</a>
                </li>
                <li className="mg-l0">
                  Diễn viên: <a>{movieDetails?.actors}</a>
                </li>
                <li className="mg-l0">
                  Ngày chiếu: <a>{formatDate(movieDetails?.startDay)}</a>
                </li>
                <li className="mg-l0">
                  Thời lượng: <a>{movieDetails?.timeAmount} phút</a>
                </li>
                <li className="mg-l0">
                  Ngôn ngữ: <a>{movieDetails?.language}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="product-info-tabs">
          <CardTheater cinemas={cinemas} tabs={tabs} filmId={filmId}/>
        </div>
      </div>
    </div>
  );
};

export default FilmDetail;
