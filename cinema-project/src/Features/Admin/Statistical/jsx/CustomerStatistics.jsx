import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { callAPI } from "../../../axios/axiosInstance";
import { API_STATISTICS } from "./Constant";
import useCommonFunctions from "../../../Common/CommonFunction";
import { useLoading } from "../../../../LoadingProvider";

const CustomerStatistics = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [customers, setCustomers] = useState([]);
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
        `${API_STATISTICS.getStatisticsCustomer}?page=${currentPage - 1}&nameCustomer=${name.trim()}&statusSort=desc`
      );
      const dataList = updateItems(
        data.content,
        pageSize,
        currentPage,
        data.totalElements
      );
      setCustomers(dataList);
      setTotalItems(data.totalElements);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching customer statistics:", err);
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
      title: "Mã thành viên",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên thành viên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Tổng tiền (VND)",
      dataIndex: "money",
      key: "money",
      render: (value) => value.toLocaleString() + " VND",
    },
    {
      title: "Điểm tích lũy",
      dataIndex: "point",
      key: "point",
    },
    {
      title: "Số lượng vé",
      dataIndex: "ticket",
      key: "ticket",
    },
  ];

  return (
    <section className="sidebar-page-container">
      <div className="auto-container">
        <h5 className="manage-title">Thống kê thành viên</h5>
        <Space className="mb-3" wrap>
          <Input
            placeholder="Nhập tên thành viên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            allowClear
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            Tìm kiếm
          </Button>
        </Space>
        <Table
          columns={columns}
          dataSource={customers}
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

export default CustomerStatistics;
