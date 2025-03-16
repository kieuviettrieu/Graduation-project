import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { callAPI } from "../../../axios/axiosInstance";
import { API_STATISTICS } from "./Constant";
import { useLoading } from "../../../../LoadingProvider";

const MovieTypeStatistics = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [genres, setGenres] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    fetchStatistics();
  }, [currentPage, pageSize]);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const data = await callAPI(
        "get",
        `${API_STATISTICS.getStatisticsMovieType}`
      );

      setGenres(data);
      setTotalItems(data.totalElements);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching genre statistics:", err);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Thể loại",
      dataIndex: "movieType",
      key: "movieType",
    },
    {
      title: "Số vé đã bán",
      dataIndex: "totalTicketsSold",
      key: "totalTicketsSold",
    },
    {
      title: "Ngày bán",
      dataIndex: "soldDate",
      key: "soldDate",
    },
    {
      title: "Doanh thu (VND)",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      render: (value) => value.toLocaleString() + " VND",
    },
  ];

  return (
    <section className="sidebar-page-container">
      <div className="auto-container">
        <h5 className="manage-title">Thống kê thể loại phim</h5>
        <Table
          columns={columns}
          dataSource={genres}
          pagination={{
            showSizeChanger: false,
            current: currentPage,
            pageSize: pageSize,
            total: totalItems,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
          }}
        />
      </div>
    </section>
  );
};

export default MovieTypeStatistics;
