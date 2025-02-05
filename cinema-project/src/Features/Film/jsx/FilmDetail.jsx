import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardTheater from "./CardTheater";
import "../Contents/Film.css";
import { API_COMMON, formatDate, generateUrl } from "../../Common/Constant";
import { callAPI } from "../../axios/axiosInstance";

const FilmDetail = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [cinemas, setCinemas] = useState(null);
  const [tabs, setTabs] = useState(null);
  const { filmId } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieDetail = await callAPI("get", generateUrl(API_COMMON.public.movieDetail, {id : filmId}));
        // const movieDetail = await callApi(generateUrl(API_COMMON.public.movieDetail, {id : filmId}), "GET");
        setMovieDetails(movieDetail);
        console.log(movieDetail, "Movie Data");
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
    // const fakeData = {
    //   posterUrl:
    //     "http://riocinemas.vn/Areas/Admin/Content/Fileuploads/images/poster%20web/T12/Ch%E1%BB%8B%20D%C3%A2u.jpg",
    //   title: "CHỊ DÂU",
    //   genre: "Drama",
    //   format: "2D",
    //   rating: "T16",
    //   director: "Khương Ngọc",
    //   cast: [
    //     "Việt Hương",
    //     "Hồng Đào",
    //     "Lê Khánh",
    //     "Đinh Y Nhung",
    //     "Ngọc Trinh",
    //   ],
    //   releaseDate: "20/12/2024",
    //   duration: "1 giờ 40 phút",
    // };
    const cinemas = [
      {
        name: "RIO Liên Chiểu Đà Nẵng",
        address:
          "403 Tôn Đức Thắng - Phường Hòa Minh - Quận Liên Chiểu - TP. Đà Nẵng",
        filmName: "AVENGERS: ENDGAME",
        dates: [
          {
            date: "09/01/2025",
            times: [
              { id: "time1", time: "15:55" },
              { id: "time2", time: "18:30" },
              { id: "time3", time: "20:00" },
            ],
          },
          {
            date: "10/01/2025",
            times: [
              { id: "time4", time: "09:00" },
              { id: "time5", time: "14:00" },
              { id: "time6", time: "19:30" },
            ],
          },
        ],
      },
      {
        name: "RIO Tam Kỳ Quảng Nam",
        address:
          "Trung tâm giải trí RIO: Đường Bạch Đằng, Phường Phước Hoà, TP. Tam Kỳ, Quảng Nam",
        filmName: "THE BATMAN",
        dates: [
          {
            date: "09/01/2025",
            times: [
              { id: "time7", time: "16:00" },
              { id: "time8", time: "18:30" },
            ],
          },
          {
            date: "10/01/2025",
            times: [
              { id: "time9", time: "10:00" },
              { id: "time10", time: "13:00" },
            ],
          },
        ],
      },
      {
        name: "RIO Hội An Quảng Nam",
        address: "09 Trần Phú, Phường Minh An, Hội An, Quảng Nam",
        filmName: "FAST & FURIOUS 9",
        dates: [
          {
            date: "09/01/2025",
            times: [
              { id: "time11", time: "12:00" },
              { id: "time12", time: "15:30" },
              { id: "time13", time: "19:00" },
            ],
          },
          {
            date: "10/01/2025",
            times: [
              { id: "time14", time: "10:00" },
              { id: "time15", time: "14:00" },
            ],
          },
        ],
      },
    ];

    const tabs = [
      {
        id: "prod-details",
        title: "Mô tả",
        content: movieDetails?.description,
      },
    ];
    setCinemas(cinemas);
    setTabs(tabs);
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

          {/* Content Column */}
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

              {/* Shop List */}
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
          <CardTheater cinemas={cinemas} tabs={tabs} />
        </div>
      </div>
    </div>
  );
};

export default FilmDetail;
