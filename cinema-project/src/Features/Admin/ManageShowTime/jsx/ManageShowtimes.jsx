import React, { useState, useEffect } from "react";
import { Space, Table, Button, message, Popconfirm, Input, Select } from "antd";
import { IoMdAdd } from "react-icons/io";
import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import useCommonFunctions from "../../../Common/CommonFunction";
import { callAPI } from "../../../axios/axiosInstance";
// import CreateShowtime from "./CreateShowtime";
// import EditShowtime from "./EditShowtime";
// import ViewShowtime from "./ViewShowtime";
import { useLoading } from "../../../../LoadingProvider";
import { API_SHOWTIME } from "./Constant";
import dayjs from "dayjs";
import { Option } from "antd/es/mentions";
import { API_FILM } from "../../ManageFilms/jsx/Constant";
import CreateShowTime from "./CreateShowTime";
import ShowTimeDetail from "./ShowTimeDetail";
const { Search } = Input;

const ManageShowtimes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [showtimes, setShowtimes] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [isOpenView, setIsOpenView] = useState(false);
  const [idView, setIdView] = useState(null);
  const [isRender, setIsRender] = useState(false);
  const [movieId, setMovieId] = useState(-1);
  const [movies, setMovies] = useState([]);
  const { setLoading } = useLoading();

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
      dataIndex: "movie",
      render: (movie) => movie.name,
    },
    {
      title: "Ngày chiếu",
      dataIndex: "date",
      key: "date",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "Giờ bắt đầu",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Giờ kết thúc",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Tình trạng",
      dataIndex: "soldOut",
      key: "soldOut",
      render: (soldOut) => (soldOut ? "Hết vé" : "Còn vé"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <Button type="dashed" onClick={() => handleEdit(record.id)}>
            Chỉnh sửa
          </Button> */}
          <Button type="dashed" onClick={() => handleView(record.id)}>
            Chi tiết
          </Button>
          {/* <Popconfirm
            title={`Bạn có muốn xóa suất chiếu của phim \"${record.movieName}\"?`}
            description="Hành động này không thể hoàn tác!"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="primary">Xoá</Button>
          </Popconfirm> */}
        </Space>
      ),
    },
  ];

  const { updateItems } = useCommonFunctions();

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        setLoading(true);
        const data = await callAPI(
          "get",
          `${API_SHOWTIME.showingShowtimes}?movieId=${-1}&page=0`
        );
        const movieData = await callAPI(
          "get",
          `${API_FILM.getMovieAll}`
        );
        const showtimesData = updateItems(
          data.content,
          pageSize,
          1,
          data.totalElements
        );
        setTotalItems(data.totalElements);
        setShowtimes(showtimesData);
        setMovies(movieData);
      } catch (err) {
        console.error("Error fetching showtimes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShowtimes();
  }, [isRender, pageSize]);

  const handleEdit = (id) => {
    setIsOpenEdit(true);
    setIdEdit(id);
  };

  const handleView = (id) => {
    setIsOpenView(true);
    setIdView(id);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await callAPI("delete", `${API_SHOWTIME.deleteShowtime}/${id}`);
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
        `${API_SHOWTIME.showingShowtimes}?movieId=${movieId}&page=${0}`
      );
      const showtimeData = updateItems(
        data.content,
        pageSize,
        1,
        data.totalElements
      );
      setTotalItems(data.totalElements);
      setShowtimes(showtimeData);
    } catch (err) {
      console.error("Error searching showtimes:", err);
    } finally {
      setLoading(false);
    }
  };

  const changePage = async (page, size) => {
    try {
      setLoading(true);
      const data = await callAPI(
        "get",
        `${API_SHOWTIME.showingShowtimes}?movieId=${movieId}&page=${page - 1}`
      );
      const showtimeData = updateItems(
        data.content,
        size,
        page,
        data.totalElements
      );
      setTotalItems(data.totalElements);
      setShowtimes(showtimeData);
    } catch (err) {
      console.error("Error fetching showtimes:", err);
    } finally {
      setLoading(false);
    }
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleReset = () => {
    setCurrentPage(1);
    setIsRender(!isRender);
  };

  const handleCreateShowTime = async (values) => {
      try {
        setLoading(true);
        await callAPI("post", API_SHOWTIME.createShowtime, values);
        setIsRender(!isRender);
        setIsOpenCreate(false);
        message.success("Suất chiếu đã được tạo thành công!");
      } catch (err) {
        message.error("Đã có lỗi xảy ra!");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

  return (
    <section className="sidebar-page-container">
      <div className="auto-container">
        <h5 className="manage-title">Danh sách suất chiếu</h5>
        <div>
          <Space className="mb-3" wrap>
          <Select placeholder="Chọn phim" onChange={(e) => setMovieId(e)}>
            {movies.map((item) => (
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
            <IoMdAdd fontSize={16} /> Thêm suất chiếu
          </Button>
          </Space>
        </div>
        <Table
          columns={columns}
          dataSource={showtimes}
          pagination={{
            showSizeChanger: false,
            current: currentPage,
            pageSize: pageSize,
            onChange: (page, size) => changePage(page, size),
          }}
        />
      </div>
      <CreateShowTime open={isOpenCreate} onClose={() => setIsOpenCreate(false)} onCreate={(value) => handleCreateShowTime(value)} />
        <ShowTimeDetail open={isOpenView} onClose={() => setIsOpenView(false)} id={idView} />
      {/* <EditShowtime open={isOpenEdit} onClose={() => setIsOpenEdit(false)} id={idEdit} />
      <ViewShowtime open={isOpenView} onClose={() => setIsOpenView(false)} id={idView} /> */}
    </section>
  );
};

export default ManageShowtimes;
