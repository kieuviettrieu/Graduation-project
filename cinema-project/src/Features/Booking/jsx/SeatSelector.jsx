import React, { useState, useEffect } from "react";
import chair from "../../../Media/img/chair.png";
import doublechair from "../../../Media/img/doublechair.png";
import vipchair from "../../../Media/img/vipchair.png";
import soldchair from "../../../Media/img/soldchair.png";
import selectedchair from "../../../Media/img/selectedchair.png";
import screen from "../../../Media/img/screen.png";
import { AvailableSeatType } from "./Constant";
import "../Contents/SeatSelector.css";
import { getZoomBy, ROUTER_PATHS } from "../../Common/Constant";
import useCommonFunctions from "../../Common/CommonFunction";

const SeatSelector = ({ seats }) => {
  const { redirectToPath } = useCommonFunctions();
  const zoomLevelInit = getZoomBy(820);
  const isMobileInit = window.matchMedia("(max-width: 1022px)").matches;
  const [zoomLevel, setZoomLevel] = useState(zoomLevelInit);
  const [isMobile, setIsMobile] = useState(isMobileInit);

  useEffect(() => {
    const handleResize = () => {
      const zoom = getZoomBy(820);
      setIsMobile(window.matchMedia("(max-width: 1022px)").matches);
      setZoomLevel(zoom);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNextStep = (e) => {
    const isLogin = false;
    if (isLogin === true) {
    } else {
      redirectToPath(ROUTER_PATHS.REGISTER);
    }
  };

  const notes = [
    { label: "Ghế thường", imgSrc: chair },
    { label: "Ghế đôi", imgSrc: doublechair },
    { label: "Ghế VIP", imgSrc: vipchair },
    { label: "Ghế đã bán", imgSrc: soldchair },
    { label: "Ghế đang chọn", imgSrc: selectedchair },
  ];

  const handleSeatClick = (seat) => {
    alert(`You selected seat ${seat.label}`);
    // Thêm logic để xử lý khi chọn ghế ở đây
  };

  return (
    <div className="auto-container">
      <div
        className="list-seat"
        style={{
          margin: "0 auto",
          width: "765px",
          position: "relative",
          height: "auto",
          maxWidth: "100%",
          overflowX: "auto",
          minWidth: "380px",
          zoom: zoomLevel,
        }}
      >
        <div className="screen-thumb">
          <h4 className="screen">Màn hình</h4>
          <img src={screen} alt="movie" />
        </div>

        {seats.map((row, rowIndex) => (
          <div
            className="clearfix row"
            key={rowIndex}
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {row.map((seat, seatIndex) => (
              <p
                key={seatIndex}
                data-row={seat.row}
                data-index={seat.index}
                data-type={seat.available ? "True" : "False"}
                className="chair"
                style={{
                  padding: "0px",
                  margin: "3px",
                  width: "35px",
                  height: "35px",
                  background: `${
                    seat?.available == AvailableSeatType.UnAvailable
                      ? "transparent"
                      : `url(${chair})`
                  }`,
                  backgroundSize: "contain",
                  color: "#333",
                  textAlign: "center",
                  fontSize: "xx-small",
                  lineHeight: "35px",
                  cursor: seat.available ? "pointer" : "default",
                }}
                onClick={() => seat.available && handleSeatClick(seat)}
              >
                {seat.label}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className="note-color">
        {notes.map((note, index) => (
          <div className="note-col" key={index}>
            <p
              style={{
                width: "20px",
                height: "20px",
                background: `url(${note.imgSrc}) no-repeat center`,
                backgroundSize: "contain",
              }}
            ></p>
            <p>{note.label}</p>
          </div>
        ))}
      </div>
      {!isMobile ? (
        <div className="col-lg-12 book-content">
          <div>
            <img
              src="http://riocinemas.vn/Areas/Admin/Content/Fileuploads/images/poster web/T12/Chị Dâu.jpg"
              alt="Poster CHỊ DÂU"
            />
          </div>
          <div>
            <ul>
              <li style={{ padding: "5px 0" }}>
                <b>Phim:</b> CHỊ DÂU
              </li>
              <li style={{ padding: "5px 0" }}>
                <b>Rạp:</b> RIO Liên Chiểu Đà Nẵng
              </li>
              <li style={{ padding: "5px 0" }}>
                <b>Phòng:</b> 04
              </li>
              <li style={{ padding: "5px 0" }}>
                <b>Suất:</b> 16:25 15/01/2025
              </li>
              <li style={{ padding: "5px 0" }}>
                <b>Thể loại:</b> 2D
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li style={{ padding: "5px 0" }}>
                <b>Ghế:</b>
                <p
                  id="total_ticket"
                  style={{
                    display: "inline-block",
                    maxWidth: "90%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                ></p>
              </li>
              <li style={{ padding: "5px 0" }}>
                <b>Tiền vé:</b>
                <p
                  id="total_seat_money"
                  style={{ display: "inline-block" }}
                ></p>
              </li>
              <li style={{ padding: "5px 0" }}>
                <b>Combo:</b> 0
              </li>
              <li style={{ padding: "5px 0" }}>
                <b>Tiền Combo:</b> 0
              </li>
              <li style={{ padding: "5px 0" }}>
                <b>Tổng Tiền:</b>
                <p id="total_money" style={{ display: "inline-block" }}></p>
              </li>
            </ul>
          </div>
          <div>
            <a href="#" onClick={(e) => handleNextStep(e)}>
              <p
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  height: "50px",
                  borderRadius: "25px",
                  margin: "0",
                  background: "#fc1b1b",
                  textAlign: "center",
                  lineHeight: "50px",
                  position: "relative",
                  top: "45%",
                  color: "#fff",
                  fontSize: "20px",
                  textTransform: "uppercase",
                }}
              >
                NEXT
              </p>
            </a>
          </div>
        </div>
      ) : (
        <div className="col-lg-12 book-content-mobile">
          <div>
            <ul>
              <li style={{ padding: "5px 0" }}>
                <b>Ghế:</b>
                <p
                  id="total_ticket_mobile"
                  style={{
                    display: "inline-block",
                    maxWidth: "90%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    margin: "-1px 5px",
                    lineHeight: "12px",
                  }}
                ></p>
              </li>
              <li style={{ padding: "5px 0" }}>
                <b>Combo:</b> 0
              </li>
              <li style={{ padding: "5px 0" }}>
                <b>Tổng Tiền:</b>
                <p
                  id="total_money_mobile"
                  style={{
                    display: "inline-block",
                  }}
                ></p>
              </li>
            </ul>
          </div>
          <div style={{ width: "100px" }}>
            <a href="#" onClick={(e) => handleNextStep(e)}>
              <p
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  height: "50px",
                  borderRadius: "25px",
                  margin: "0",
                  background: "#fc1b1b",
                  textAlign: "center",
                  lineHeight: "50px",
                  position: "relative",
                  top: "45%",
                  color: "#fff",
                  fontSize: "20px",
                  textTransform: "uppercase",
                }}
              >
                NEXT
              </p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelector;
