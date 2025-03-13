import React, { useState, useEffect } from "react";
import chair from "../../../Media/img/chair.png";
import doublechair from "../../../Media/img/doublechair.png";
import vipchair from "../../../Media/img/vipchair.png";
import soldchair from "../../../Media/img/soldchair.png";
import selectedchair from "../../../Media/img/selectedchair.png";
import screen from "../../../Media/img/screen.png";
import { useDispatch, useSelector } from "react-redux";
import { SeatType } from "./Constant";
import "../Contents/SeatSelector.css";
import {
  API_COMMON,
  formatDateTime,
  generateUrl,
  getZoomBy,
  ROUTER_PATHS,
} from "../../Common/Constant";
import useCommonFunctions from "../../Common/CommonFunction";
import { callAPI } from "../../axios/axiosInstance";
import "../Contents/Booking.css";
import { saveTickeInfo } from "../../../Redux/Actions";
import { useLoading } from "../../../LoadingProvider";
import useWebSocket from "../../Common/WebSocket";

const SeatSelector = ({ showTimeId }) => {
  const dispatch = useDispatch();
  // const ticketInfo = useSelector((state) => state.auth.ticketInfo);
  const { redirectToPath, checkPageLogin } = useCommonFunctions();
  const zoomLevelInit = getZoomBy(820);
  const isMobileInit = window.matchMedia("(max-width: 1022px)").matches;
  const [showTime, setShowTime] = useState(null);
  const [room, setRoom] = useState(null);
  const [ticKets, setTickets] = useState([]);
  const [selecteds, setSelecteds] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(zoomLevelInit);
  const [isMobile, setIsMobile] = useState(isMobileInit);
  const { setLoading } = useLoading();
  const { seatStatus } = useWebSocket();
  const [seatHolding, setSeatHolding] = useState([]);

  const convertTickets = (arr) => {
    const groupedBookings = Object.values(
      arr.reduce((acc, booking) => {
        if (!booking.chairRoom || !booking.chairRoom.chair) return acc;

        const chairName = booking.chairRoom.chair.name;
        const groupKey = chairName.charAt(0);

        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }

        acc[groupKey].push({
          id: booking.id,
          price: booking.price,
          bookDateTime: booking.bookDateTime,
          status: booking.status,
          isDelete: booking.isDelete,
          customer: booking.customer,
          chairRoom: booking.chairRoom,
        });

        return acc;
      }, {})
    );
    return groupedBookings;
  };

  const toggleIdInChair = (id) => {
    setSelecteds((prevSelecteds) =>
      prevSelecteds.includes(id)
        ? prevSelecteds.filter((item) => item !== id)
        : [...prevSelecteds, id]
    );
  };

  useEffect(() => {
    setSeatHolding(seatStatus);
    console.log(seatStatus, "seatStatus")
  }, [seatStatus]);

  useEffect(() => {
    const ticketData = ticKets.map((subArray) =>
      subArray.map((item) => ({
        ...item,
        status: selecteds.includes(item.id)
          ? SeatType.Selected
          : item?.status === SeatType.Selected
          ? 0
          : item?.status,
      }))
    );
    setTickets(ticketData);
  }, [selecteds]);

  const getStatusById = (id) => {
    const ticket = seatHolding.find((ticket) => ticket.idTicket === id);
    return ticket ? ticket.status : null;
  };

  useEffect(() => {
    const ticketData = ticKets.map((subArray) =>
      subArray.map((item) => ({
        ...item,
        status: item?.status === SeatType.Sold ? SeatType.Sold : getStatusById(item?.id) === "HOLD"
          ? SeatType.Selected
          : getStatusById(item?.id) === "SOLD"
          ? SeatType.Sold
          : getStatusById(item?.id) === "AVAILABLE" ? SeatType.Normal : item?.status,
      }))
    );
    setTickets(ticketData);
  }, [seatHolding]);

  const getTotalCost = (arr) => {
    return arr
      ?.flat()
      .reduce(
        (total, item) => (item.status === 4 ? total + item.price : total),
        0
      );
  };

  const getChairSelected = () => {
    const arr = ticKets?.flat();
    const result = arr
      .filter((item) => item?.status === SeatType.Selected)
      .map((item) => ({
        name: item?.chairRoom?.chair?.name,
        price: item?.price,
        id: item?.id,
      }));
    return result;
  };

  const getChairSelectedStr = () => {
    const arr = ticKets?.flat();
    const result = arr
      .filter((item) => item?.status === SeatType.Selected)
      .map((item) => item?.chairRoom?.chair?.name)
      .join(", ");
    return result;
  };

  const switchCaseChair = (chairType, id) => {
    if (selecteds.includes(id)) {
      return selectedchair;
    }
    switch (chairType) {
      case SeatType.Sold:
        return soldchair;
      case SeatType.Double:
        return doublechair;
      case SeatType.Vip:
        return vipchair;
      case SeatType.Selected:
        return selectedchair;
      default:
        return chair;
    }
  };

  useEffect(() => {
    checkPageLogin();
    const fetchData = async () => {
      try {
        setLoading(true);
        const showTimeData = await callAPI(
          "get",
          generateUrl(API_COMMON.public.getShowTime, { id: showTimeId })
        );
        const roomData = await callAPI(
          "get",
          generateUrl(API_COMMON.public.getRoom, { idShowTime: showTimeId })
        );
        const ticketData = await callAPI(
          "get",
          generateUrl(API_COMMON.public.getTicketByRoomAndShowTime, {
            idRoom: roomData?.id,
            idShowTime: showTimeId,
          })
        );
        const statusList = await callAPI(
          "get",
          generateUrl(API_COMMON.public.getSeatStatus)
        );
        setShowTime(showTimeData);
        setRoom(roomData);
        setTickets(convertTickets(ticketData));
        setSeatHolding(statusList);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    const ticketInfo = {
      movie: {
        title: showTime?.movie?.name,
        image: showTime?.movie?.image,
      },
      cinema: room?.cinema?.name,
      room: room?.name,
      showtime: formatDateTime(showTime?.date, showTime?.startTime),
      seats: getChairSelected(),
      showTimeId: showTime?.id,
    };
    dispatch(saveTickeInfo({ infoConfirm: ticketInfo, selecteds: selecteds }));
    redirectToPath(ROUTER_PATHS.BOOKING_CONFIRM);
  };

  const notes = [
    { label: "Ghế thường", imgSrc: chair },
    { label: "Ghế đôi", imgSrc: doublechair },
    { label: "Ghế VIP", imgSrc: vipchair },
    { label: "Ghế đã bán", imgSrc: soldchair },
    { label: "Ghế đang chọn", imgSrc: selectedchair },
  ];

  const handleSeatClick = (seat) => {
    toggleIdInChair(seat?.id);
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

        {ticKets &&
          ticKets.map((row, rowIndex) => (
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
                  data-row={seat?.id}
                  data-index={seat?.id}
                  className="chair"
                  style={{
                    padding: "0px",
                    margin: "3px",
                    width: "35px",
                    height: "35px",
                    background: `${`url(${
                      selecteds.includes(seat?.id)
                        ? selectedchair
                        : switchCaseChair(seat?.status, seat?.id)
                    }) 0% 0% / contain`}`,
                    backgroundSize: "contain",
                    color: "#333",
                    textAlign: "center",
                    fontSize: "xx-small",
                    lineHeight: "35px",
                    cursor:
                      seat?.status == SeatType.Sold || getStatusById(seat?.id) === "SOLD" ||  getStatusById(seat?.id) === "HOLD" ? "not-allowed" : "pointer",
                    userSelect:
                      seat?.status == SeatType.Sold || getStatusById(seat?.id) === "SOLD" || getStatusById(seat?.id) === "HOLD" ? "none" : "default",
                  }}
                  onClick={() =>
                    seat?.status != SeatType.Sold && !getStatusById(seat?.id) && handleSeatClick(seat)
                  }
                >
                  {seat?.chairRoom?.chair?.name}
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
            <img src={showTime?.movie?.image} alt="Poster movie" />
          </div>
          <div>
            <ul>
              <li style={{ padding: "5px 0" }}>
                <b>Phim:</b> {showTime?.movie?.name}
              </li>
              <li style={{ padding: "5px 0" }}>
                <b>Rạp:</b> {room?.cinema?.name}
              </li>
              <li style={{ padding: "5px 0" }}>
                <b>Phòng:</b> {room?.name}
              </li>
              <li style={{ padding: "5px 0" }}>
                <b>Suất:</b>{" "}
                {formatDateTime(showTime?.date, showTime?.startTime)}
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li style={{ padding: "5px 0" }}>
                <b>Ghế: </b> {getChairSelectedStr()}
              </li>
              <li style={{ padding: "5px 0" }}>
                <b>Tiền vé: </b> {getTotalCost(ticKets)}
              </li>
              <li style={{ padding: "5px 0" }}>
                <b>Combo:</b> 0
              </li>
              <li style={{ padding: "5px 0" }}>
                <b>Tiền Combo:</b> 0
              </li>
              <li style={{ padding: "5px 0" }}>
                <b>Tổng Tiền:</b> {getTotalCost(ticKets)}
              </li>
            </ul>
          </div>
          <div className={selecteds?.length > 0 ? "" : "disabled"}>
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
                <b>Ghế:</b> {getChairSelectedStr()}
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
                <b>Tổng Tiền:</b> {getTotalCost(ticKets)}
                <p
                  id="total_money_mobile"
                  style={{
                    display: "inline-block",
                  }}
                ></p>
              </li>
            </ul>
          </div>
          <div
            style={{ width: "100px" }}
            className={selecteds?.length > 0 ? "" : "disabled"}
          >
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
