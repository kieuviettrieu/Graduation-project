import React, { useState, useEffect } from "react";
import { Drawer, Descriptions, Spin, message } from "antd";
import dayjs from "dayjs";
import { callAPI } from "../../../axios/axiosInstance";
import { API_EMPLOYEE } from "./Constant";

const ViewEmployee = ({ open, onClose, id }) => {
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await callAPI("get", `${API_EMPLOYEE.getEmployee}/${id}`);
        setEmployee(data);
      } catch (error) {
        message.error("Không thể tải thông tin nhân viên!");
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchEmployee();
    }
  }, [id, open]);

  return (
    <Drawer
      title="Chi tiết nhân viên"
      width={600}
      onClose={onClose}
      open={open}
    >
      {loading ? (
        <Spin size="large" />
      ) : employee ? (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Hình ảnh">
            {employee?.image ? (
              <img src={employee.image} alt="nhân viên" width="150px" />
            ) : (
              "Không có ảnh"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Họ tên">
            {employee.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {dayjs(employee.birthday).format("DD/MM/YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính">
            {employee.gender ? "Nam" : "Nữ"}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{employee.email}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {employee.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {employee.address}
          </Descriptions.Item>
          <Descriptions.Item label="CCCD">{employee.cardId}</Descriptions.Item>
          <Descriptions.Item label="Tài khoản">
            {employee.account?.username}
          </Descriptions.Item>
          <Descriptions.Item label="Vị trí">
            {employee.position?.name}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </Drawer>
  );
};

export default ViewEmployee;
