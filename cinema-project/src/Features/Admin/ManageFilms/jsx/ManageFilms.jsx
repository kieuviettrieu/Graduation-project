import React, { useState, useEffect } from "react";
import { Space, Table, Input, Button, message, Popconfirm } from "antd";
import { IoMdAddCircle } from "react-icons/io";
import useCommonFunctions from "../../../Common/CommonFunction";
import { callAPI } from "../../../axios/axiosInstance";
import CreateFilm from "./CreateFilm";
import EditFilm from "./EditFilm";
import { API_FILM } from "./Constant";

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

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const data = await callAPI(
          "get",
          `${API_FILM.getMovies}?name=&studio=&page=0`
        );
        const filmsData = updateItems(data.content, pageSize, 1, data.totalElements);
        setTotalItems(data.totalElements);
        setFilms(filmsData);
      } catch (err) {
        console.error("Error fetching films:", err);
      }
    };

    fetchFilms();
  }, [isRender, updateItems, pageSize]);

  const columns = [
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

  const changePage = async (page, size) => {
    try {
      const data = await callAPI(
        "get",
        `${API_FILM.getMovies}?name=&studio=&page=${page - 1}`
      );
      const filmsData = updateItems(data.content, pageSize, page, data.totalElements);
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
          <Search
            placeholder="Tìm kiếm phim..."
            allowClear
            onSearch={() => {}}
            style={{ width: 200, marginRight: "10px" }}
          />
          <Button type="primary" onClick={() => setIsOpenCreate(true)}>
            <IoMdAddCircle fontSize={16}/>
            Thêm phim
          </Button>
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
    </section>
  );
};

export default ManageFilms;
