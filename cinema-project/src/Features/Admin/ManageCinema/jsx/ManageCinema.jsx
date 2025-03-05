import React, { useState, useEffect } from "react";
import { Space, Table, Button, message, Image, Popconfirm } from "antd";
import { IoMdAddCircle } from "react-icons/io";
import useCommonFunctions from "../../../Common/CommonFunction";
import { callAPI } from "../../../axios/axiosInstance";
import CreateCinema from "./CreateCinema";
import EditCinema from "./EditCinema";
import { API_CINEMA } from "./Constant";
import Search from "antd/es/input/Search";
import { useLoading } from "../../../../LoadingProvider";

const ManageCinema = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [cinemas, setCinemas] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [isRender, setIsRender] = useState(false);
  const [nameSearch, setNameSearch] = useState('');
  const { setLoading } = useLoading();

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (_text, _record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Tên rạp",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
            title={`Bạn có muốn xóa rạp"${record.name}"?`}
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
    const fetchCinemas = async () => {
      try {
        setLoading(true);
        const data = await callAPI("get", `${API_CINEMA.showingCinema}?name=&?page=0`);
        const cinemaData = updateItems(
          data.content,
          pageSize,
          currentPage,
          data.totalElements
        );
        setTotalItems(data.totalElements);
        setCinemas(cinemaData);
      } catch (err) {
        console.error("Error fetching cinemas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCinemas();
  }, [isRender]);

  const changePage = async (page, size) => {
    try {
      setLoading(true);
      const data = await callAPI("get", `${API_CINEMA.showingCinema}?name=${nameSearch.trim()}&page=${page - 1}`);
      const cinemaData = updateItems(data.content, size, page, data.totalElements);
      setTotalItems(data.totalElements);
      setCinemas(cinemaData);
    } catch (err) {
      console.error("Error fetching cinemas:", err);
    } finally {
      setLoading(false);
    }
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleCreateCinema = async (values) => {
    try {
      setLoading(true);
      await callAPI("post", API_CINEMA.addCinema, values);
      setIsRender(!isRender);
      message.success("Rạp chiếu phim đã được tạo thành công!");
    } catch (err) {
      message.error("Đã có lỗi xảy ra!");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCinema = async (values) => {
    try {
      setLoading(true);
      await callAPI("put", API_CINEMA.updateCinema + "/" + idEdit, values);
      setIsRender(!isRender);
      message.success("Rạp chiếu phim đã được cập nhật thành công!");
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
      await callAPI("delete", `${API_CINEMA.deleteCinema}/${id}`);
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

  const handleSearch = async (name) => {
      setNameSearch(name);
      setCurrentPage(1);
      try {
        setLoading(true);
        const data = await callAPI("get", `${API_CINEMA.showingCinema}?name=${name.trim()}&page=0`
        );
        const cinemaData = updateItems(
          data.content,
          pageSize,
          1,
          data.totalElements
        );
        setTotalItems(data.totalElements);
        setCinemas(cinemaData);
      } catch (err) {
        console.error("Error searching films:", err);
      } finally {
        setLoading(false);
      }
    };

  return (
    <section className="sidebar-page-container">
      <div className="auto-container">
      <h5 className="manage-title">Danh sách rạp</h5>
        <div>
        <Search
            placeholder="tên rạp..."
            allowClear
            onSearch={(e) => handleSearch(e)}
            style={{
              width: 200,
              marginRight: "10px",
            }}
          />
          <Button type="primary" onClick={() => setIsOpenCreate(true)}>
            <IoMdAddCircle fontSize={16} /> Thêm rạp
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={cinemas}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            onChange: (page, size) => changePage(page, size),
          }}
        />
      </div>
      <CreateCinema
        open={isOpenCreate}
        onClose={() => setIsOpenCreate(false)}
        onCreate={(values) => handleCreateCinema(values)}
      />
      <EditCinema
        open={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        onUpdate={(values) => handleEditCinema(values)}
        id={idEdit}
      />
    </section>
  );
};

export default ManageCinema;
