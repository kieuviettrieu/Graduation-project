import React, { useEffect, useState } from "react";
import { Drawer, Descriptions, Spin, message } from "antd";
import dayjs from "dayjs";
import { callAPI } from "../../../axios/axiosInstance";
import { API_CUSTOMER } from "./Constant";
import { useLoading } from "../../../../LoadingProvider";

const ViewCustomer = ({ open, onClose, id }) => {
  const { setLoading } = useLoading();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await callAPI("get", `${API_CUSTOMER.getCustomer}/${id}`);
        setCustomer(data);
      } catch (error) {
        message.error("Không thể tải thông tin khách hàng!");
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchCustomer();
    }
  }, [id, open]);

  return (
    <Drawer title="Thông tin khách hàng" width={680} onClose={onClose} open={open}>
      {customer ? (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Họ tên">{customer.fullName}</Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {dayjs(customer.birthday).format("DD/MM/YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính">
            {customer.gender ? "Nam" : "Nữ"}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{customer.email}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{customer.phoneNumber}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{customer.address}</Descriptions.Item>
          <Descriptions.Item label="CMND/CCCD">{customer.cardId}</Descriptions.Item>
          <Descriptions.Item label="Tên đăng nhập">{customer.account?.username}</Descriptions.Item>
        </Descriptions>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </Drawer>
  );
};

export default ViewCustomer;
