import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useCommonFunctions from "../../Common/CommonFunction";
import { API_COMMON, generateUrl, ROUTER_PATHS } from "../../Common/Constant";
import { callAPI } from "../../axios/axiosInstance";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { message } from "antd";
import { useLoading } from "../../../LoadingProvider";

const ConfirmTicket = () => {
  const { redirectToPath } = useCommonFunctions();
  const [ticketData, setTicketData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showPaymentButton, setShowPaymentButton] = useState(false);
  const { ticketInfo, user } = useSelector((state) => state.auth);
  const { checkPageLogin } = useCommonFunctions();
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 phút = 300 giây
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const { setLoading } = useLoading();
  const [seatIds, setSeatIds] = useState([]);  

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    checkPageLogin();
    const fetchData = async () => {
      try {
        setLoading(true);
        const info = await callAPI(
          "get",
          generateUrl(API_COMMON.public.getUser, { username: user?.username })
        );
        setUserData(info);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setTicketData(ticketInfo?.infoConfirm);
  }, []);

  useEffect(() => {
    if (ticketData) {
      const ticketIds = ticketData?.seats?.map((i) => i?.id);
      setSeatIds(ticketIds);
    }
  }, [ticketData]);

  const holdSeats = async (selectedSeats) => {
    const ticketData = selectedSeats.map((seat) => ({
      idTicket: seat,
      username: user?.username,
      status: "HOLD",
    }));
    const apiHold = "http://localhost:8080/api/user/seats/hold";

    await callAPI("post", apiHold, ticketData)
  };

  const releaseSeats = async (selectedSeats) => {
    const api_release = "http://localhost:8080/api/user/seats/release";

    await callAPI("delete", api_release, selectedSeats);
  };

  useEffect(() => {
    if (seatIds.length > 0) {
      holdSeats(seatIds);
    }
    return () => {
      releaseSeats(seatIds);
    };
  }, [seatIds]);

  if (!ticketData) return <p>Không có dữ liệu vé!</p>;

  const { movie, cinema, showtime, seats, room, showTimeId } = ticketData;
  const totalAmount = seats.reduce((total, seat) => total + seat.price, 0);

  // Khi nhấn "Xác nhận", hiển thị nút thanh toán
  const handleConfirm = () => {
    setShowPaymentButton(true);
  };

  // Xử lý thanh toán PayPal
  const createOrder = async () => {
    try {
      setLoading(true);
      const rateUSD = await fetch(
        "https://v6.exchangerate-api.com/v6/5630f4c8f4bb2280d85582d9/latest/USD"
      );
      const data = await rateUSD.json();
      const usdToVndRate = data.conversion_rates.VND || 25520;
      const response = await callAPI(
        "post",
        "http://localhost:8080/api/paypal/create-order",
        {
          amount: Number((totalAmount / usdToVndRate).toFixed(2)),
        }
      );
      return response;
    } catch (error) {
      console.error("Lỗi tạo đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  const onApprove = async (data) => {
    const { seats } = ticketData;
    const ticketIds = seats.map((item) => item?.id);
    try {
      setLoading(true);
      const response = await callAPI(
        "post",
        `http://localhost:8080/api/paypal/capture-payment/${data.orderID}`
      );

      if (response?.status === "COMPLETED") {
        await callAPI("post", API_COMMON.public.bookingTicket, ticketIds);
        message.success("Đặt vé thành công");
        redirectToPath(ROUTER_PATHS.USER_PROFILE);
      } else {
        message.error("Thanh toán chưa hoàn tất. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận thanh toán:", error);
      message.error("Đã xảy ra lỗi khi xử lý thanh toán. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auto-container" style={{ justifyItems: "center" }}>
      <div className="col-12 shadow shadow-lg p-4 rounded-3 my-3">
        <div className="row">
          {/* Cột ảnh phim */}
          <div
            className="col-lg-3 text-center mb-3"
            style={{ padding: "0px 30px" }}
          >
            <img
              alt={movie.title}
              className="w-100 height-image"
              src={movie.image}
            />
          </div>

          {/* Cột thông tin vé */}
          <div className="col-lg-9 table-responsive">
            <div className="title">
              <h4 className="d-block mb-2 text-uppercase">{movie.title}</h4>
              <hr />
            </div>

            <div className="detail__ticket px-3">
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">Rạp:</th>
                    <td>{cinema}</td>
                  </tr>
                  <tr>
                    <th scope="row">Suất chiếu:</th>
                    <td>{showtime}</td>
                  </tr>
                  <tr>
                    <th scope="row">Phòng:</th>
                    <td>{room}</td>
                  </tr>
                  <tr>
                    <th scope="row">Ghế:</th>
                    <td>{seats.map((seat) => seat.name).join(", ")}</td>
                  </tr>
                  <tr>
                    <th scope="row">Tổng cộng:</th>
                    <td
                      style={{
                        color: "#F26B38",
                        fontSize: "22px",
                        fontWeight: "500",
                      }}
                    >
                      ₫{totalAmount.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Thông tin khách hàng */}
            <div className="title pt-2">
              <span className="d-block mb-2" style={{ fontSize: "20px" }}>
                Kiểm tra thông tin đặt vé
              </span>
              <hr />
            </div>

            <div className="check__detail__ticket px-3">
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">Họ tên:</th>
                    <td>{userData?.fullName}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email:</th>
                    <td>{userData?.email}</td>
                  </tr>
                  <tr>
                    <th scope="row">Số điện thoại:</th>
                    <td>{userData?.phoneNumber}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Nút hành động */}
            <div style={{ color: "rgb(242, 107, 56)" }}>
              Vui lòng hoàn tất thủ tục thanh toán trong {minutes}:
              {seconds.toString().padStart(2, "0")}
            </div>
            <div className="btn-active py-3 d-flex">
              {!showPaymentButton ? (
                <>
                  <button
                    className="btn__common bg-danger me-2 d-flex align-items-center confirm-button"
                    onClick={() => redirectToPath("/booking/" + showTimeId)}
                  >
                    <i className="bi bi-box-arrow-left me-2"></i> QUAY LẠI
                  </button>
                  <button
                    className="btn__common d-flex align-items-center confirm-button"
                    onClick={() => handleConfirm()}
                  >
                    <i className="bi bi-ticket-detailed me-2"></i> XÁC NHẬN
                  </button>
                </>
              ) : (
                <div className="mt-3">
                  <h5>Chọn phương thức thanh toán</h5>
                  <PayPalButtons
                    createOrder={() => createOrder()}
                    onApprove={(e) => onApprove(e)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTicket;
