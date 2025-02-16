import React, { useState, useEffect } from "react";
import { Space, Table, Input, Button, message, Popconfirm } from "antd";
import useCommonFunctions from "../../../Common/CommonFunction";
import { callAPI } from "../../../axios/axiosInstance";
import { API_CUSTOMER } from "./Constant";
import EditCustomer from "./EditCustomer";
import ViewCustomer from "./ViewCustomer";

const { Search } = Input;

const ManageCustomers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [isOpenView, setIsOpenView] = useState(false);
  const [idView, setIdView] = useState(null);
  const [isRender, setIsRender] = useState(false);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (_text, _record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => (gender ? "Nam" : "Nữ"),
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
      render: (birthday) => new Date(birthday).toLocaleDateString("vi-VN"),
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
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "CCCD",
      dataIndex: "cardId",
      key: "cardId",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="dashed" onClick={() => handleEdit(record.id)}>
            Chỉnh sửa
          </Button>
          {/* <Popconfirm
            title={`Bạn có muốn xóa "${record.fullName}"?`}
            description="Hành động này không thể hoàn tác!"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="primary">Xoá</Button>
          </Popconfirm> */}
          <Button type="primary" onClick={() => handleView(record.id)}>Chi tiết</Button>
        </Space>
      ),
    },
  ];

  const { updateItems } = useCommonFunctions();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await callAPI("get", `${API_CUSTOMER.showingCustomers}?page=0`);
        const customersData = updateItems(
          data.content,
          pageSize,
          currentPage,
          data.totalElements
        );
        setTotalItems(data.totalElements);
        setCustomers(customersData);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };
    fetchCustomers();
  }, [isRender]);

  const changePage = async (page, size) => {
    try {
      const data = await callAPI("get", `${API_CUSTOMER.showingCustomers}?search=&page=${page - 1}`);
      const customersData = updateItems(data.content, pageSize, page, data.totalElements);
      setTotalItems(data.totalElements);
      setCustomers(customersData);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
    setCurrentPage(page);
    setPageSize(size);
  };


  const handleEditCustomer = async (values) => {
    try {
      await callAPI("put", API_CUSTOMER.updateCustomer, values);
      setIsRender(!isRender);
      message.success("Khách hàng đã được cập nhật thành công!");
    } catch (err) {
      message.error("Đã có lỗi xảy ra!");
      console.error("Error:", err);
    }
  };

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
      await callAPI("delete", `${API_CUSTOMER.deleteCustomer}/${id}`);
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
        <h5 className="manage-title">Danh sách khách hàng</h5>
        <div>
          <Search placeholder="Tìm kiếm khách hàng..." allowClear onSearch={() => {}} style={{ width: 200, marginRight: "10px" }} />
        </div>
        <Table
          columns={columns}
          dataSource={customers}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            onChange: (page, size) => changePage(page, size),
          }}
        />
      </div>
      <EditCustomer open={isOpenEdit} onClose={() => setIsOpenEdit(false)} onUpdate={(values) => handleEditCustomer(values)} id={idEdit} />
      <ViewCustomer open={isOpenView} onClose={() => setIsOpenView(false)} id={idView}/>
    </section>
  );
};

export default ManageCustomers;
