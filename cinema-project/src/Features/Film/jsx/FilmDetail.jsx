import React, { useState, useEffect } from "react";
import CardTheater from "./CardTheater";
import '../Contents/Film.css';

const FilmDetail = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [cinemas, setCinemas] = useState(null);
  const [tabs, setTabs] = useState(null);

  useEffect(() => {
    // Gọi API bằng fetch
    // fetch('https://api.example.com/movie-details') // Thay bằng URL API thật
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setMovieDetails(data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching movie details:', error);
    //   });
    const fakeData = {
      posterUrl:
        "http://riocinemas.vn/Areas/Admin/Content/Fileuploads/images/poster%20web/T12/Ch%E1%BB%8B%20D%C3%A2u.jpg",
      title: "CHỊ DÂU",
      genre: "Drama",
      format: "2D",
      rating: "T16",
      director: "Khương Ngọc",
      cast: [
        "Việt Hương",
        "Hồng Đào",
        "Lê Khánh",
        "Đinh Y Nhung",
        "Ngọc Trinh",
      ],
      releaseDate: "20/12/2024",
      duration: "1 giờ 40 phút",
    };
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
        content:
          "Chuyện bắt đầu khi bà Nhị - con dâu cả của gia đình quyết định nhân dịp đám giỗ của mẹ chồng, tụ họp cả bốn chị em gái - con ruột trong nhà lại để thông báo chuyện sẽ tự bỏ tiền túi ra sửa sang căn nhà từ đường cũ kỹ trước khi bão về. Vấn đề này khiến cho nội bộ gia đình bắt đầu có những lục đục, chị dâu và các em chồng cũng xảy ra mâu thuẫn, bất hoà. Dần dà những sự thật đằng sau việc 'bằng mặt mà không bằng lòng' giữa các chị em cũng dần được hé lộ, những bí mật, nỗi đau sâu thẳm nhất trong mỗi cá nhân cũng dần được bóc tách. Liệu sợi dây liên kết vốn đã mong manh giữa các chị em có bị cắt đứt và liệu 'căn nhà' vốn đã dột nát ấy có còn nguyên vẹn sau cơn bão lớn?",
      },
    ];
    setMovieDetails(fakeData);
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
                            src={movieDetails.posterUrl}
                            alt={movieDetails.title}
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
                {movieDetails.title} <i style={{ fontSize: "13px" }}></i>
              </h4>
              <p>
                {movieDetails.genre} - {movieDetails.format}
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
                {movieDetails.rating}
              </p>
              <hr />

              {/* Shop List */}
              <ul className="shop-list">
                <li>
                  Đạo diễn: <a>{movieDetails.director}</a>
                </li>
                <li>
                  Diễn viên: <a>{movieDetails.cast.join(", ")}</a>
                </li>
                <li>
                  Ngày chiếu: <a>{movieDetails.releaseDate}</a>
                </li>
                <li>
                  Thời lượng: <a>{movieDetails.duration}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="product-info-tabs">
          <CardTheater cinemas={cinemas} tabs={tabs}/>
        </div>
      </div>
    </div>
  );
};

export default FilmDetail;
