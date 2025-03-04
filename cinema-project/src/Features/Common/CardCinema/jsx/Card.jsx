import React from "react";
import '../Content/index.css';

const CinemaCard = ({ name, address, phone, image, link }) => {
  return (
    <div className="col-lg-6 col-md-6 col-sm-12 pd-right-0 pd-left-0">
      <div className="news-block-two">
        <div className="inner-box">
          <div className="image">
            <a href={link}>
              <img src={image} alt={name} />
            </a>
          </div>
          <div className="lower-content cine-content">
            <h4>
              <a href={link}>{name}</a>
            </h4>
            <div className="text">
              <i className="fa fa-map-marker"></i> {address}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p>
                <i className="fa fa-phone"></i> {phone}
              </p>
              <a
                href={link}
                style={{
                  fontSize: "12px",
                  padding: "0 10px",
                  background: "#febf2d",
                  borderRadius: "20px",
                  height: "35px",
                  lineHeight: "35px",
                  color: "#7b0408",
                  fontWeight: "600",
                }}
              >
                Xem chi tiết
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaCard;
