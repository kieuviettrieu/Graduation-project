import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Input, Button, message, Popconfirm } from "antd";
import { IoMdPersonAdd } from "react-icons/io";
import useCommonFunctions from "../../../Common/CommonFunction";
import { callAPI } from "../../../axios/axiosInstance";
import { API_ROOM } from "./Constant";
import CreateRoom from "./CreateRoom";
// import EditRoom from "./EditRoom";
const { Search } = Input;

const ManageRoom = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [isRender, setIsRender] = useState(false);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Tên phòng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Màn hình",
      dataIndex: "screen",
      key: "screen",
    },
    {
      title: "Rạp phim",
      dataIndex: "cinemaName",
      key: "cinemaName",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={status === "active" ? "green" : "red"}>{status}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="dashed" onClick={() => handleEdit(record.id)}>
            Chỉnh sửa
          </Button>
          <Popconfirm
            title={`Bạn có muốn xóa "${record.name}"?`}
            description="Hành động này không thể hoàn tác!"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="primary">Xoá</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const { updateItems } = useCommonFunctions();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await callAPI("get", API_ROOM.showingRooms + "?name=&status=all&page=0");
        const roomsData = updateItems(data.content, pageSize, 1, data.totalElements);
        setTotalItems(data.totalElements);
        setRooms(roomsData);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };

    fetchRooms();
  }, [isRender, updateItems, pageSize]);

  const changePage = async (page, size) => {
    try {
      const data = await callAPI("get", `${API_ROOM.showingRooms}?name=&status=all&page=${page - 1}`);
      const roomsData = updateItems(data.content, pageSize, page, data.totalElements);
      setTotalItems(data.totalElements);
      setRooms(roomsData);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleCreateRoom = async (values) => {
    try {
      await callAPI("post", API_ROOM.addRoom, values);
      setIsRender(!isRender);
      message.success("Phòng đã được tạo thành công!");
    } catch (err) {
      message.error("Đã có lỗi xảy ra!");
      console.error("Error:", err);
    }
  };

  const handleEditRoom = async (values) => {
    try {
      await callAPI("put", API_ROOM.updateRoom, values);
      setIsRender(!isRender);
      message.success("Phòng đã được cập nhật thành công!");
    } catch (err) {
      message.error("Đã có lỗi xảy ra!");
      console.error("Error:", err);
    }
  };

  const handleEdit = (id) => {
    setIsOpenEdit(true);
    setIdEdit(id);
  };

  const handleDelete = async (id) => {
    try {
      await callAPI("delete", `${API_ROOM.deleteRoom}/${id}`);
      setCurrentPage(1);
      setIsRender(!isRender);
      message.success("Đã xoá thành công!");
    } catch (err) {
      message.error("Đã có lỗi xảy ra!");
      console.error("Error:", err);
    }
  };

  return (
    <section className="sidebar-page-container">
      <div className="auto-container">
        <h5 className="manage-title">Danh sách phòng</h5>
        <div>
          <Search
            placeholder="Tìm kiếm phòng..."
            allowClear
            onSearch={() => {}}
            style={{ width: 200, marginRight: "10px" }}
          />
          <Button type="primary" onClick={() => setIsOpenCreate(true)}>
            <IoMdPersonAdd fontSize={16} />
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={rooms}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            onChange: (page, size) => changePage(page, size),
          }}
        />
      </div>
      <CreateRoom open={isOpenCreate} onClose={() => setIsOpenCreate(false)} onCreate={handleCreateRoom} />
      {/* <EditRoom open={isOpenEdit} onClose={() => setIsOpenEdit(false)} onUpdate={handleEditRoom} id={idEdit} /> */}
    </section>
  );
};

export default ManageRoom;
