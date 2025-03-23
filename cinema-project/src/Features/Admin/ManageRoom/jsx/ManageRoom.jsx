import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Input, Button, message, Popconfirm, Select } from "antd";
import { IoMdAddCircle } from "react-icons/io";
import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import useCommonFunctions from "../../../Common/CommonFunction";
import { callAPI } from "../../../axios/axiosInstance";
import { API_ROOM } from "./Constant";
import CreateRoom from "./CreateRoom";
import { useLoading } from "../../../../LoadingProvider";
import { Option } from "antd/es/mentions";
import { API_CINEMA } from "../../ManageCinema/jsx/Constant";
import EditRoom from "./EditRoom";
// import EditRoom from "./EditRoom";
const { Search } = Input;

const ManageRoom = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [cinemaId, setCinemaId] = useState(-1);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [isRender, setIsRender] = useState(false);
  const { setLoading } = useLoading();
  const { updateItems } = useCommonFunctions();

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
      dataIndex: "cinema",
      key: "cinema",
      render: (item) => <span>{item?.name}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={"green"}>{"Đang hoạt động"}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="dashed" onClick={() => handleEdit(record)}>
            Chỉnh sửa
          </Button>
        </Space>
      ),
    },
  ];


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const data = await callAPI("get", API_ROOM.showingRooms + "?id=-1&page=0");
        const cinemaData = await callAPI("get", API_CINEMA.getCinemaAll);
        setCinemas(cinemaData);
        const roomsData = updateItems(data.content, pageSize, 1, data.totalElements);
        setTotalItems(data.totalElements);
        setRooms(roomsData);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [isRender, pageSize]);

  const changePage = async (page, size) => {
    try {
      setLoading(true);
      const data = await callAPI("get", `${API_ROOM.showingRooms}?id=${cinemaId}&page=${page - 1}`);
      const roomsData = updateItems(data.content, pageSize, page, data.totalElements);
      setTotalItems(data.totalElements);
      setRooms(roomsData);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    } finally {
      setLoading(false);
    }
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleCreateRoom = async (values) => {
    try {
      setLoading(true);
      await callAPI("post", API_ROOM.addRoom, values);
      setIsOpenCreate(false);
      setIsRender(!isRender);
      message.success("Phòng đã được tạo thành công!");
    } catch (err) {
      message.error("Đã có lỗi xảy ra!");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditRoom = async (values) => {
    try {
      setLoading(true);
      await callAPI("put", API_ROOM.updateRoom + "/" + idEdit?.id, values);
      setIsRender(!isRender);
      message.success("Phòng đã được cập nhật thành công!");
    } catch (err) {
      message.error("Đã có lỗi xảy ra!");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    setIsOpenEdit(true);
    setIdEdit(id);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await callAPI("delete", `${API_ROOM.deleteRoom}/${id}`);
      setCurrentPage(1);
      setIsRender(!isRender);
      message.success("Đã xoá thành công!");
    } catch (err) {
      message.error("Đã có lỗi xảy ra!");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setCurrentPage(1);
    try {
      setLoading(true);
      const data = await callAPI(
        "get",
        `${API_ROOM.showingRooms}?id=${cinemaId}&page=${0}`
      );
      const roomData = updateItems(
        data.content,
        pageSize,
        1,
        data.totalElements
      );
      setTotalItems(data.totalElements);
      setRooms(roomData);
    } catch (err) {
      console.error("Error searching rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentPage(1);
    setIsRender(!isRender);
  };

  return (
    <section className="sidebar-page-container">
      <div className="auto-container">
        <h5 className="manage-title">Danh sách phòng</h5>
        <div>
        <Space className="mb-3" wrap>
        <Select placeholder="Chọn rạp phim" onChange={(e) => setCinemaId(e)}>
            {cinemas.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => handleSearch()}
          />
          <Button icon={<UndoOutlined />} onClick={() => handleReset()} />
          <Button type="primary" onClick={() => setIsOpenCreate(true)}>
            <IoMdAddCircle fontSize={16} /> Thêm phòng
          </Button>
          </Space>
        </div>
        <Table
          columns={columns}
          dataSource={rooms}
          pagination={{
            showSizeChanger: false,
            current: currentPage,
            pageSize: pageSize,
            onChange: (page, size) => changePage(page, size),
          }}
        />
      </div>
      <CreateRoom open={isOpenCreate} onClose={() => setIsOpenCreate(false)} onCreate={handleCreateRoom} cinemaData={cinemas}/>
      <EditRoom open={isOpenEdit} onClose={() => setIsOpenEdit(false)} onEdit={handleEditRoom} roomData={idEdit} />
    </section>
  );
};

export default ManageRoom;
