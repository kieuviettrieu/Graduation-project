import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Input, Button, message, Popconfirm } from "antd";
import { IoMdPersonAdd } from "react-icons/io";
import useCommonFunctions from "../../../Common/CommonFunction";
import { callAPI } from "../../../axios/axiosInstance";
import { API_EMPLOYEE } from "./Constant";
import CreateEmployee from "./CreateEmployee";
import EditEmployee from "./EditEmployee";
import ViewEmployee from "./ViewEmployee";
import { useLoading } from "../../../../LoadingProvider";
const { Search } = Input;

const ManageEmployees = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [isOpenView, setIsOpenView] = useState(false);
  const [idView, setIdView] = useState(null);
  const [isRender, setIsRender] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
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
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="dashed" onClick={() => handleEdit(record.id)}>
            Chỉnh sửa
          </Button>
          <Button type="dashed" onClick={() => handleView(record.id)}>
            Chi tiết
          </Button>
          <Popconfirm
            title={`Bạn có muốn xóa "${record.fullName}"?`}
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
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const data = await callAPI(
          "get",
          API_EMPLOYEE.showingEmployees + "?name=&positionId=-1&page=0"
        );
        const employeesData = updateItems(
          data.content,
          pageSize,
          1,
          data.totalElements
        );
        setTotalItems(data.totalElements);
        setEmployees(employeesData);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [isRender, pageSize]);

  function handleView(id) {
    setIsOpenView(true);
    setIdView(id);
  }

  const changePage = async (page, size) => {
    try {
      setLoading(true);
      const data = await callAPI(
        "get",
        `${
          API_EMPLOYEE.showingEmployees
        }?name=${nameSearch.trim()}&positionId=-1&page=${page - 1}`
      );
      const employeesData = updateItems(
        data.content,
        pageSize,
        page,
        data.totalElements
      );
      setTotalItems(data.totalElements);
      setEmployees(employeesData);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleCreateEmployee = async (values) => {
    try {
      setLoading(true);
      const respone = await callAPI("post", API_EMPLOYEE.addEmployee, values);
      setIsRender(!isRender);
      message.success("Nhân viên đã được tạo thành công!");
    } catch (err) {
      message.error("Đã có lỗi xảy ra!");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditEmployee = async (values) => {
    try {
      setLoading(true);
      const respone = await callAPI("put", API_EMPLOYEE.updateEmployee, values);
      setIsRender(!isRender);
      message.success("Nhân viên đã được cập nhật thành công!");
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
      const response = await callAPI(
        "delete",
        `${API_EMPLOYEE.deleteEmployee}/${id}`
      );
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
      const data = await callAPI(
        "get",
        `${API_EMPLOYEE.showingEmployees}?name=${name}&positionId=-1&page=0`
      );

      const employeeData = updateItems(
        data.content,
        pageSize,
        1,
        data.totalElements
      );
      setTotalItems(data.totalElements);
      setEmployees(employeeData);
    } catch (err) {
      console.error("Error searching films:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sidebar-page-container">
      <div className="auto-container">
        <h5 className="manage-title">Danh sách nhân viên</h5>
        <div>
          <Search
            placeholder="tên nhân viên..."
            allowClear
            onSearch={(e) => handleSearch(e)}
            style={{
              width: 200,
              marginRight: "10px",
            }}
          />
          <Button type="primary" onClick={() => setIsOpenCreate(true)}>
            <IoMdPersonAdd fontSize={16} />
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={employees}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            onChange: (page, size) => changePage(page, size),
          }}
        />
      </div>
      <CreateEmployee
        open={isOpenCreate}
        onClose={() => setIsOpenCreate(false)}
        onCreate={(values) => handleCreateEmployee(values)}
      />
      <EditEmployee
        open={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        onUpdate={(values) => handleEditEmployee(values)}
        id={idEdit}
      />
      <ViewEmployee
        open={isOpenView}
        onClose={() => setIsOpenView(false)}
        id={idView}
      />
    </section>
  );
};

export default ManageEmployees;
