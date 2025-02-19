import React, { useState, useEffect } from "react";
import { Space, Table, Button, message, Popconfirm } from "antd";
import { callAPI } from "../../../axios/axiosInstance";
import Search from "antd/es/input/Search";
import useCommonFunctions from "../../../Common/CommonFunction";
import { API_TICKET, TICKET_STATUS_STR } from "./Constant";

const ManageTickets = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { updateItems } = useCommonFunctions();

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (_text, _record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Mã đặt vé",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Giá vé",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Thời gian đặt vé",
      dataIndex: "bookDateTime",
      render: (_, record) => {
        const bookDateTime = record?.bookDateTime || null;
        const formattedDate = bookDateTime ? new Date(bookDateTime).toISOString().split("T")[0] : "";
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => (
        <span>{TICKET_STATUS_STR[record?.status || 0]}</span>
      ),
    },
    {
      title: "Họ tên",
      key: "customer",
      render: (_, record) => (
        <span>{record?.customer?.fullName || ""}</span>
      ),
    },
    {
      title: "Ngày chiếu",
      key: "dateShowTime",
      render: (_, record) => {
        const dateShowTime = record?.showTime?.date || null;
        const formattedDate = dateShowTime ? new Date(dateShowTime).toISOString().split("T")[0] : "";
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Suất chiếu",
      key: "showTime",
      render: (_, record) => {
        const startTime = record?.showTime?.startTime || ""; 
        const formattedTime = startTime ? startTime.split(":").slice(0, 2).join(":") : "";
    
        return <span>{formattedTime}</span>;
      },
    },
    {
      title: "Ghế",
      key: "chairRoom",
      render: (_, record) => (
        <span>{record?.chairRoom?.chair?.name || ""}</span>
      ),
    },
    // {
    //   title: "Xoá vé",
    //   key: "deleteTicket",
    //   render: (_, record) => (
    //     <Popconfirm
    //       title="Bạn có chắc muốn xóa vé này?"
    //       onConfirm={() => handleDelete(record.id)}
    //       okText="Xóa"
    //       cancelText="Hủy"
    //     >
    //       <Button type="primary" danger>Xóa</Button>
    //     </Popconfirm>
    //   ),
    // },
  ];

  useEffect(() => {
    fetchTickets();
  }, [isRender]);

  const fetchTickets = async () => {
    try {
      const data = await callAPI("get", `${API_TICKET.showingTicket}?nameSearch=${searchTerm.trim()}&page=0`);
      const ticketData = updateItems(data.content, pageSize, currentPage, data.totalElements);
      setTotalItems(data.totalElements);
      setTickets(ticketData);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  const handleDelete = async (ticketId) => {
    try {
      await callAPI("delete", `/api/tickets/${ticketId}`);
      setIsRender(!isRender);
      message.success("Vé đã bị xoá thành công!");
    } catch (err) {
      message.error("Đã có lỗi xảy ra!");
    }
  };

  const handleSearch = async (name) => {
    setSearchTerm(name);
    setCurrentPage(1);
    try {
      const data = await callAPI("get", `${API_TICKET.showingTicket}?nameSearch=${name.trim()}&page=0`);
      console.log(data, "data");
      const ticketData = updateItems(data.content, pageSize, currentPage, data.totalElements);
      setTotalItems(data.totalElements);
      setTickets(ticketData);
    } catch (err) {
      setTotalItems(0);
      setTickets([]);
      message.error("Thông tin tìm kiếm không chính xác!");
    }
  };

  const changePage = async (page, size) => {
      try {
        const data = await callAPI("get", `${API_TICKET.showingTicket}?nameSearch=${searchTerm.trim()}&page=${page - 1}`);
        const ticketData = updateItems(data.content, pageSize, currentPage, data.totalElements);
        setTotalItems(data.totalElements);
        setTickets(ticketData);
      } catch (err) {
        console.error("Error fetching cinemas:", err);
      }
      setCurrentPage(page);
      setPageSize(size);
    };

  return (
    <section className="sidebar-page-container">
      <div className="auto-container">
        <h5 className="manage-title">Danh sách vé đã bán</h5>
        <div>
          <Search
            placeholder="Tìm kiếm vé..."
            allowClear
            onSearch={(e) => handleSearch(e)}
            style={{ width: 200, marginRight: "10px" }}
          />
        </div>
        <Table
          columns={columns}
          dataSource={tickets}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            onChange: (page, size) => changePage(page, size),
          }}
        />
      </div>
    </section>
  );
};

export default ManageTickets;
