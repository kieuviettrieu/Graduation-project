import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Input, Button, message } from "antd";
import { IoMdPersonAdd } from "react-icons/io";
import useCommonFunctions from "../../../Common/CommonFunction";
import { callAPI } from "../../../axios/axiosInstance";
import { API_EMPLOYEE } from "./Constant";
import CreateEmployee from "./CreateEmployee";
import EditEmployee from "./EditEmployee";
const { Search } = Input;

const ManageEmployees = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [isRender, setIsRender] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
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
          <Button type="primary" onClick={() => handleDelete(record.id)}>
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  const { updateItems } = useCommonFunctions();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await callAPI(
          "get",
          API_EMPLOYEE.showingEmployees + "?name=&positionId=-1&page=0"
        );
        const employeesData = updateItems(
          data.content,
          pageSize,
          currentPage,
          data.totalElements
        );
        setTotalItems(data.totalElements);
        setEmployees(employeesData);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchEmployees();
  }, [isRender]);

  const changePage = async (page, size) => {
    try {
      const data = await callAPI(
        "get",
        `${API_EMPLOYEE.showingEmployees}?name=&positionId=-1&page=${page - 1}`
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
    }
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleCreateEmployee = async (values) => {
    try {
      const respone = await callAPI("post", API_EMPLOYEE.addEmployee, values);
      setIsRender(!isRender);
      message.success("Nhân viên đã được tạo thành công!");
    } catch (err) {
      message.error("Đã có lỗi xảy ra!");
      console.error("Error:", err);
    }
  };

  const handleEditEmployee = async (values) => {
    try {
      const respone = await callAPI("put", API_EMPLOYEE.updateEmployee, values);
      setIsRender(!isRender);
      message.success("Nhân viên đã được cập nhật thành công!");
    } catch (err) {
      message.error("Đã có lỗi xảy ra!");
      console.error("Error:", err);
    }
  };

  const handleEdit = (id) => {
    setIsOpenEdit(true);
    setIdEdit(id);
  }

  const handleDelete = async (id) => {
    try {
      console.log(id, "id");
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
    }
  };

  return (
    <section className="sidebar-page-container">
      <div className="auto-container">
        <div>
          <Search
            placeholder="input search..."
            allowClear
            onSearch={() => {}}
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
    </section>
  );
};

export default ManageEmployees;
