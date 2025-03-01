import React, { useState, useEffect } from "react";
import { Form, Input, Radio, DatePicker, Button, message, Card, Space } from "antd";
import { callAPI } from "../../../axios/axiosInstance";
import { API_COMMON, generateUrl } from "../../Constant";
import { useSelector } from "react-redux";
import { useLoading } from "../../../../LoadingProvider";
import dayjs from "dayjs";

const AccountInfo = () => {
  const { user } = useSelector((state) => state.auth);
  const { setLoading } = useLoading();
  const [form] = Form.useForm();
  const [loading, setFormLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await callAPI(
          "get",
          generateUrl(API_COMMON.public.getUser, { username: user?.username })
        );
        form.setFieldsValue({
          id: data.id,
          fullName: data.fullName,
          gender: data.gender,
          birthday: dayjs(data.birthday), // Chuyển đổi ngày
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: data.address,
          cardId: data.cardId,
        });
      } catch (err) {
        message.error("Lỗi khi tải dữ liệu!");
        console.error("Error fetching user:", err);
      }
      setLoading(false);
    };
    fetchData();
  }, [form, setLoading]);

  const handleSubmit = async (values) => {
    setFormLoading(true);
    try {
      await callAPI("put", API_COMMON.public.updateUserInfo, {
        ...values,
        birthday: values.birthday.format("YYYY-MM-DD"), // Chuyển đổi ngày tháng về định dạng chuẩn
      });
      message.success("Cập nhật thành công!");
    } catch (err) {
      message.error("Đã có lỗi xảy ra!");
      console.error("Error:", err);
    }
    setFormLoading(false);
  };

  return (
    <Card title="THÔNG TIN TÀI KHOẢN" className="shadow">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item label="Mã thành viên" name="id">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item
          label="Ngày sinh"
          name="birthday"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
        >
          <DatePicker format="DD/MM/YYYY" className="w-100" />
        </Form.Item>

        <Form.Item label="Giới tính" name="gender">
          <Radio.Group>
            <Radio value={true}>Nam</Radio>
            <Radio value={false}>Nữ</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="CMND"
          name="cardId"
          rules={[{ required: true, message: "Vui lòng nhập CMND!" }, { pattern: /^\d{9}$/, message: "CCCD phải có 9 chữ số" }]}
        >
          <Input placeholder="Nhập số CMND" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input placeholder="Nhập địa chỉ" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Cập nhật
            </Button>
            <Button>
              <a href="/">Quay lại</a>
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AccountInfo;
