import React, { useState } from "react";
import {
  Drawer,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../Contents/CreateEmployee.css";
import dayjs from "dayjs";

const { Option } = Select;
const CreateEmployee = ({ open, onClose, onCreate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [passWord, setPassWord] = useState(false);
  const [isPassWordConfirm, setIsPassWordConfirm] = useState(true);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log("Form Values:", values);
      const {
        address,
        birstday = null,
        cardId,
        confirmPassword,
        email,
        fullName,
        gender,
        image = null,
        password,
        phoneNumber,
        position = { id: 5, name: "Quản lý" },
        username,
      } = values;
      const employee = {
        address,
        birstday : null,
        cardId,
        confirmPassword,
        email,
        fullName,
        gender,
        image : null,
        password,
        phoneNumber,
        position : { id: 5, name: "Quản lý" },
        username,
      };
      onCreate(employee);
      message.success("Nhân viên đã được tạo thành công!");
      form.resetFields();
      onClose();
    } catch (error) {
      message.error("Đã có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const changePassConfirm = (e) => {
    setIsPassWordConfirm(e.ta);
  };
  console.log(isPassWordConfirm, "isss");

  return (
    <Drawer
      title="Thêm nhân viên mới"
      width={680}
      onClose={onClose}
      open={open}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item name="avatar" label="Hình ảnh">
          <Upload>
            <Button icon={<UploadOutlined />}>Tải lên</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="username"
          label="Tài khoản"
          rules={[
            { required: true, message: "Vui lòng nhập tài khoản" },
            { min: 6, max: 45, message: "Tài khoản phải từ 6 đến 45 ký tự" },
            {
              pattern: /^[A-z_](\w|\.|_){5,45}$/,
              message: "Tài khoản không hợp lệ",
            },
          ]}
        >
          <Input placeholder="Nhập tài khoản" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu" },
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
            onChange={(e) => setPassWord(e.target?.value)}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu" }]}
          help={!isPassWordConfirm ? "Mật khẩu xác nhận không khớp" : ""}
        >
          <Input.Password
            placeholder="Xác nhận mật khẩu"
            onChange={(e) => setIsPassWordConfirm(e.target.value === passWord)}
          />
        </Form.Item>

        <Form.Item
          name="fullName"
          label="Họ tên"
          rules={[
            { required: true, message: "Vui lòng nhập họ tên" },
            { min: 7, max: 45, message: "Họ tên phải từ 7 đến 45 ký tự" },
            {
              pattern:
                /^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$/,
              message: "Họ tên không hợp lệ",
            },
          ]}
        >
          <Input placeholder="Nhập họ tên" />
        </Form.Item>

        <Form.Item
          name="position"
          label="Vị trí"
          rules={[{ required: true, message: "Vui lòng chọn vị trí" }]}
        >
          <Select placeholder="Chọn vị trí">
            <Option value="manager">Quản lý</Option>
            <Option value="staff">Nhân viên</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dob"
          label="Ngày sinh"
          rules={[
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.resolve();
                }
                return dayjs().diff(value, "years") >= 16
                  ? Promise.resolve()
                  : Promise.reject(new Error("Nhân viên phải trên 16 tuổi"));
              },
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
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
            { max: 256, message: "Email không được quá 256 ký tự" },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          name="cardId"
          label="CCCD"
          rules={[
            { required: true, message: "Vui lòng nhập CCCD" },
            { pattern: /^\d{9}$/, message: "CCCD phải có 9 chữ số" },
          ]}
        >
          <Input placeholder="Nhập CCCD" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            { pattern: /^(0\d{9,10})$/, message: "Số điện thoại không hợp lệ" },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ" },
            { min: 3, max: 100, message: "Địa chỉ phải từ 3 đến 100 ký tự" },
          ]}
        >
          <Input.TextArea rows={3} placeholder="Nhập địa chỉ" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Thêm nhân viên
          </Button>
          <Button onClick={onClose} style={{ marginLeft: 10 }}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateEmployee;
