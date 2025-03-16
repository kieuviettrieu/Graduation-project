import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { callAPI } from "../../../axios/axiosInstance";
import { API_COMMON } from "../../Constant";
import useCommonFunctions from "../../CommonFunction";
import { useLoading } from "../../../../LoadingProvider";

const PointHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [pointHistory, setPointHistory] = useState([]);
  const { updateItems } = useCommonFunctions();
  const { setLoading } = useLoading();

  useEffect(() => {
    fetchPointHistory(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchPointHistory = async (page, size) => {
    try {
      setLoading(true);
      const response = await callAPI("get", `${API_COMMON.public.getPointHistory}/${page - 1}`);
      const points = updateItems(
        response.content,
        size,
        page,
        response.totalElements
      );
      setPointHistory(points);
      setTotalItems(response.totalElements);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách điểm thưởng:", error);
    } finally {
      setLoading(false);
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
      title: "Ngày",
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
      title: "Điểm cộng",
      dataIndex: "point",
      key: "rewardPoints",
      render: (point) => point.toLocaleString("vi-VN"),
    },
  ];

  return (
    <div className="container">
      <Table
        columns={columns}
        dataSource={pointHistory}
        pagination={{
          showSizeChanger: false,
          current: currentPage,
          pageSize: pageSize,
          total: totalItems,
          onChange: (page, size) => changePage(page, size),
        }}
      />
    </div>
  );
};

export default PointHistory;
