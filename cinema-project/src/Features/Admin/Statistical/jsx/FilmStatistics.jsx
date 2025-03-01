import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { callAPI } from "../../../axios/axiosInstance";
import { API_STATISTICS } from "./Constant";
import useCommonFunctions from "../../../Common/CommonFunction";
import { useLoading } from "../../../../LoadingProvider";

const FilmStatistics = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [films, setFilms] = useState([]);
  const [name, setName] = useState("");
  const { updateItems } = useCommonFunctions();
  const { setLoading } = useLoading();

  useEffect(() => {
    fetchStatistics();
  }, [currentPage, pageSize]);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const data = await callAPI(
        "get",
        `${API_STATISTICS.getStatisticsFilm}?page=${
          currentPage - 1
        }&nameMovie=${name.trim()}&statusSort=desc`
      );
      const dataList = updateItems(
        data.content,
        pageSize,
        1,
        data.totalElements
      );
      setFilms(dataList);
      setTotalItems(data.totalElements);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching film statistics:", err);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchStatistics();
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
      title: "Tên phim",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Doanh thu (VND)",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (value) => value.toLocaleString() + " VND",
    },
    {
      title: "Số lượng vé đã bán",
      dataIndex: "totalTicket",
      key: "totalTicket",
    },
  ];

  return (
    <section className="sidebar-page-container">
      <div className="auto-container">
        <h5 className="manage-title">Thống kê phim</h5>
        <Space className="mb-3" wrap>
          <Input
            placeholder="Nhập tên phim"
            value={name}
            onChange={(e) => setName(e.target.value)}
            allowClear
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => handleSearch()}
          >
            Tìm kiếm
          </Button>
        </Space>
        <Table
          columns={columns}
          dataSource={films}
          pagination={{
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

export default FilmStatistics;
