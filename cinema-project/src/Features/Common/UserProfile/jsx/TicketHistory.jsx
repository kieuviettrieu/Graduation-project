import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import { callAPI } from "../../../axios/axiosInstance";
import { API_COMMON } from "../../Constant";
import useCommonFunctions from "../../CommonFunction";

const TicketHistory = ({isPoint}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [bookings, setBookings] = useState([]);
  const { updateItems } = useCommonFunctions();

  useEffect(() => {
    fetchBookings(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchBookings = async (page, size) => {
    try {
      const response = await callAPI("get", `${API_COMMON.public.getTicketHistory}/${page-1}`);
      const tickets = updateItems(
        response.content,
        pageSize,
        page,
        response.totalElements
      );
      setBookings(tickets);
      setTotalItems(response.totalItems);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách vé:", error);
    }
  };

  const changePage = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (_text, _record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Tên phim",
      dataIndex: ["showTime", "movie", "name"],
      key: "movieName",
    },
    {
      title: "Ghế",
      dataIndex: ["chairRoom", "chair", "name"],
      key: "seat",
    },
    {
      title: "Ngày đặt",
      dataIndex: "bookDateTime",
      key: "bookingDate",
      render: (date) => new Date(date).toLocaleString("vi-VN"),
    },
    {
      title: "Tổng tiền",
      dataIndex: "price",
      key: "totalPrice",
      render: (price) => price.toLocaleString("vi-VN") + " VND",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === 1 ? "green" : "volcano";
        let text = status === 1 ? "Đã thanh toán" : "Chờ xử lý";
        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];

  const columnPointHistory = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (_text, _record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Ngày tạo",
      dataIndex: "date",
      key: "createdDate",
      render: (date) => new Date(date).toLocaleString("vi-VN"),
    },
    {
      title: "Tên phim",
      dataIndex: "description",
      key: "movieName",
    },
    {
      title: "Điểm thưởng",
      dataIndex: "point",
      key: "rewardPoints",
      render: (point) => point.toLocaleString("vi-VN"),
    },
  ];

  return (
    <div className="container">
      <Table
        columns={isPoint ? columnPointHistory : columns}
        dataSource={bookings}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          onChange: (page, size) => changePage(page, size),
        }}
      />
    </div>
  );
};

export default TicketHistory;
