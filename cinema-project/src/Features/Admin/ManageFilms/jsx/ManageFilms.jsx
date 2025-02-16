import React, { useState, useEffect } from "react";
import { Space, Table, Input, Button, message, Popconfirm, Select } from "antd";
import { IoMdAddCircle } from "react-icons/io";
import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import useCommonFunctions from "../../../Common/CommonFunction";
import { callAPI } from "../../../axios/axiosInstance";
import CreateFilm from "./CreateFilm";
import EditFilm from "./EditFilm";
import { API_FILM } from "./Constant";
import dayjs from "dayjs";
import { Option } from "antd/es/mentions";
import ViewFilm from "./ViewFilm";

const { Search } = Input;

const ManageFilms = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [films, setFilms] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [isRender, setIsRender] = useState(false);
  const { updateItems } = useCommonFunctions();
  const [name, setName] = useState("");
  const [studio, setStudio] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  const [isOpenView, setIsOpenView] = useState(false);
  const [idView, setIdView] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const data = await callAPI(
          "get",
          `${API_FILM.getMovies}?name=&startDay=&studios=&timeAmount=&page=0`
        );
        const filmsData = updateItems(
          data.content,
          pageSize,
          1,
          data.totalElements
        );
        setTotalItems(data.totalElements);
        setFilms(filmsData);
      } catch (err) {
        console.error("Error fetching films:", err);
      }
    };

    fetchFilms();
  }, [isRender, pageSize]);

  const handleReset = () => {
    setName("");
    setStudio("");
    setTimeDuration("");
    setIsRender(!isRender);
  };

  const handleSearch = async () => {
    setCurrentPage(1);
    try {
      const data = await callAPI(
        "get",
        `${API_FILM.getMovies}?name=${name.trim()}&startDay=&studios=${studio.trim()}&timeAmount=${timeDuration}&page=0`
      );
      const filmsData = updateItems(
        data.content,
        pageSize,
        1,
        data.totalElements
      );
      setTotalItems(data.totalElements);
      setFilms(filmsData);
    } catch (err) {
      console.error("Error searching films:", err);
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
      title: "Tên phim",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hãng phim",
      dataIndex: "movieStudio",
      key: "movieStudio",
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "startDay",
      key: "startDay",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "Thời lượng (phút)",
      dataIndex: "timeAmount",
      key: "timeAmount",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="dashed" onClick={() => handleEdit(record.id)}>
            Chỉnh sửa
          </Button>
          <Button type="dashed" onClick={() => handleView(record.id)}>Chi tiết</Button>
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

  const handleView = (id) => {
    setIsOpenView(true);
    setIdView(id);
  };

  const changePage = async (page, size) => {
    try {
      const data = await callAPI(
        "get",
        `${API_FILM.getMovies}?name=${name.trim()}&startDay=&studios=${studio.trim()}&timeAmount=${timeDuration}&page=${page - 1}`
      );
      const filmsData = updateItems(
        data.content,
        pageSize,
        page,
        data.totalElements
      );
      setTotalItems(data.totalElements);
      setFilms(filmsData);
    } catch (err) {
      console.error("Error fetching films:", err);
    }
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleCreateFilm = async (values) => {
    try {
      await callAPI("post", API_FILM.createMovie, values);
      setIsRender(!isRender);
      message.success("Phim đã được tạo thành công!");
    } catch (err) {
      message.error("Đã có lỗi xảy ra!");
      console.error("Error:", err);
    }
  };

  const handleEditFilm = async (values) => {
    try {
      await callAPI("put", API_FILM.updateMovie, values);
      setIsRender(!isRender);
      message.success("Phim đã được cập nhật thành công!");
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
      await callAPI("delete", `${API_FILM.deleteMovie}/${id}`);
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
        <h5 className="manage-title">Danh sách phim</h5>
        <div>
          <Space className="mb-3" wrap>
            <Input
              placeholder="Tên phim cần tìm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              allowClear
            />
            <Input
              placeholder="Hãng phim"
              value={studio}
              onChange={(e) => setStudio(e.target.value)}
              allowClear
            />
            <Select
              placeholder="Thời Lượng Phim"
              value={timeDuration}
              onChange={e => setTimeDuration(e)}
              style={{ width: 180 }}
              allowClear
            >
              <Option value="" default>Thời lượng phim</Option>
              <Option value="60">Thời lượng dưới 60p</Option>
              <Option value="90">Thời lượng 60-120p</Option>
              <Option value="120">Thời lượng trên 120p</Option>
            </Select>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => handleSearch()}
            />
            <Button icon={<UndoOutlined />} onClick={() => handleReset()} />
            <Button type="primary" onClick={() => setIsOpenCreate(true)} >
              <IoMdAddCircle fontSize={16} />
              Thêm phim
            </Button>
          </Space>
        </div>
        <Table
          columns={columns}
          dataSource={films}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            onChange: (page, size) => changePage(page, size),
          }}
        />
      </div>
      <CreateFilm
        open={isOpenCreate}
        onClose={() => setIsOpenCreate(false)}
        onCreate={handleCreateFilm}
      />
      {/* <EditFilm
        open={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        onUpdate={handleEditFilm}
        id={idEdit}
      /> */}
      <ViewFilm open={isOpenView} onClose={() => setIsOpenView(false)} id={idView}/>
    </section>
  );
};

export default ManageFilms;
