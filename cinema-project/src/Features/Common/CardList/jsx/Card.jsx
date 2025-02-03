import React, { useState, useEffect } from "react";
import "../Content/index.css";
import {
  formatDate,
  generateUrl,
  getZoomBy,
  ROUTER_PATHS,
} from "../../Constant";

const Card = (props) => {
  const zoomLevelInit = getZoomBy(599);
  const [zoomLevel, setZoomLevel] = useState(zoomLevelInit);
  const { data } = props;

  useEffect(() => {
    const handleResize = () => {
      const zoom = getZoomBy(599);
      setZoomLevel(zoom);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="price-block col-xl-3 col-lg-3 col-md-4 col-sm-6"
      style={{ position: "relative", display: "block", zoom: zoomLevel }}
    >
      <div className="news-block-two">
        <div className="inner-box" style={{ boxShadow: "none" }}>
          <div className="image" style={{ padding: 0 }}>
            <a
              href={generateUrl(ROUTER_PATHS.FILM_DETAIL, {
                filmId: data?.id,
              })}
            >
              <img src={data?.image} alt={data?.name || "Movie Poster"} />
            </a>
            <p
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                width: "40px",
                height: "25px",
                background: "#f82525",
                textAlign: "center",
                borderRadius: "3px",
                color: "#ffffff",
                lineHeight: "25px",
              }}
            >
              {data?.ageRating || "P"}
            </p>
          </div>
          <div className="lower-content">
            <h4 style={{ textAlign: "center" }}>
              <a
                href={generateUrl(ROUTER_PATHS.FILM_DETAIL, {
                  filmId: data?.id,
                })}
              >
                {data?.name || "Movie Title"}
              </a>
            </h4>
            <p style={{ textAlign: "center" }}>
              Khởi chiếu: {formatDate(data?.startDay) || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
