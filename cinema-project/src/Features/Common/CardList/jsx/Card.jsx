import * as React from "react";
import "../Content/index.css";
import { generateUrl, ROUTER_PATHS } from "../../Constant";

export function Card(props) {
  const { data } = props;

  return (
    <div
      className="price-block col-xl-3 col-lg-3 col-md-4 col-sm-6"
      style={{ position: "relative", display: "block" }}
    >
      <div className="news-block-two">
        <div className="inner-box" style={{ boxShadow: "none" }}>
          <div className="image" style={{ padding: 0 }}>
            <a
              href={generateUrl(ROUTER_PATHS.FILM_DETAIL, {
                filmId: data?.id,
              })}
            >
              <img src={data?.imageUrl} alt={data?.title || "Movie Poster"} />
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
              {data?.ageRating || "T18"}
            </p>
          </div>
          <div className="lower-content">
            <h4 style={{ textAlign: "center" }}>
              <a
                href={generateUrl(ROUTER_PATHS.FILM_DETAIL, {
                  filmId: data?.id,
                })}
              >
                {data?.title || "Movie Title"}
              </a>
            </h4>
            <p style={{ textAlign: "center" }}>
              Khởi chiếu: {data?.releaseDate || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
