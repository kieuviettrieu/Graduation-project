import React, { useEffect, useState } from "react";
import { Drawer, Form, Input, Button, Select, DatePicker, message } from "antd";
import dayjs from "dayjs";
import { uploadImageToCloudinary } from "../../../../uploadImage";
import { Cloud_Name, Upload_Preset } from "../../../Common/Constant";

const { Option } = Select;

const EditCustomer = ({ open, onClose, onUpdate, customerData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(customerData?.image || "");

  useEffect(() => {
    if (customerData) {
      form.setFieldsValue({
        ...customerData,
        birthday: customerData.birthday ? dayjs(customerData.birthday) : null,
      });
    }
  }, [customerData, form]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const { fullName, birthday, gender, email, phoneNumber, address } = values;
      const birthdayValue = birthday ? birthday.format("YYYY-MM-DD") : "";
      const imageLink = image ? await uploadImageToCloudinary(image, Cloud_Name, Upload_Preset) : imageUrl;

      const updatedCustomer = {
        ...customerData,
        fullName,
        birthday: birthdayValue,
        gender,
        email,
        phoneNumber,
        address,
        image: imageLink,
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
    <Drawer title="Chỉnh sửa khách hàng" width={680} onClose={onClose} open={open}>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item name="image" label="Hình ảnh">
          <input type="file" onChange={handleImageChange} />
          {imageUrl && <img src={imageUrl} alt="Uploaded" width="300px" />}
        </Form.Item>

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
          rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ" }]}
        >
          <Input placeholder="Nhập email" />
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
