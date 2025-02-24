import React, { useEffect, useState } from "react";
import { Drawer, Form, Input, Button, Select, DatePicker, message } from "antd";
import dayjs from "dayjs";
import { callAPI } from "../../../axios/axiosInstance";
import { API_CUSTOMER } from "./Constant";

const { Option } = Select;

const EditCustomer = ({ open, onClose, onUpdate, id }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [confirmPassWord, setConfirmPassWord] = useState("");
  const [isPassWordConfirm, setIsPassWordConfirm] = useState(true);
  const [passWord, setPassWord] = useState("");

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        if (!id) return;
        const data = await callAPI("get", `${API_CUSTOMER.getCustomer}/${id}`);
        form.setFieldsValue({
          address: data.address,
          birthday: dayjs(data.birthday),
          cardId: data.cardId,
          email: data.email,
          fullName: data.fullName,
          gender: String(data.gender),
          phoneNumber: data.phoneNumber,
          username: data.account?.username,
        });
        setCustomer(data);
      } catch (error) {
        console.error("Error fetching Customer:", error);
      }
    };

    if (open) {
      fetchCustomer();
    }
  }, [id, open, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const {
        fullName,
        birthday,
        gender,
        email,
        phoneNumber,
        address,
        password,
        cardId,
      } = values;
      const birthdayValue = birthday ? birthday.format("YYYY-MM-DD") : "";
      
      const accountData = (password && password !== '') ? {
        ...customer.account,
        password,
      } : {
        ...customer.account,
      };

      const updatedCustomer = {
        ...customer,
        fullName,
        birthday: birthdayValue,
        gender,
        email,
        phoneNumber,
        address,
        cardId,
        account: accountData,
      };

      onUpdate(updatedCustomer);
      onClose();
    } catch (error) {
      message.error("Đã có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Chỉnh sửa khách hàng"
      width={680}
      onClose={onClose}
      open={open}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="fullName"
          label="Họ tên"
          rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
        >
          <Input placeholder="Nhập họ tên" />
        </Form.Item>

        <Form.Item
          name="birthday"
          label="Ngày sinh"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
        >
          <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Giới tính"
          rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
        >
          <Select placeholder="Chọn giới tính">
            <Option value="true">Nam</Option>
            <Option value="false">Nữ</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Vui lòng nhập email hợp lệ",
            },
          ]}
        >
          <Input placeholder="Nhập email" disabled />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input.TextArea rows={3} placeholder="Nhập địa chỉ" />
        </Form.Item>

        <Form.Item
          name="cardId"
          label="CMND/CCCD"
          rules={[{ required: true, message: "Vui lòng nhập CMND/CCCD" }]}
        >
          <Input placeholder="Nhập CMND/CCCD" disabled />
        </Form.Item>

        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
        >
          <Input placeholder="Nhập tên đăng nhập" disabled />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
            },
          ]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu"
            onChange={(e) => {
              setPassWord(e.target?.value);
              setIsPassWordConfirm(e.target?.value === confirmPassWord);
            }}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          help={!isPassWordConfirm ? "Mật khẩu xác nhận không khớp" : ""}
        >
          <Input.Password
            placeholder="Xác nhận mật khẩu"
            onChange={(e) => {
              setIsPassWordConfirm(e.target.value === passWord);
              setConfirmPassWord(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật khách hàng
          </Button>
          <Button onClick={onClose} style={{ marginLeft: 10 }}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditCustomer;
