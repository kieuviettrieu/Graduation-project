import React, { useState, useEffect } from "react";
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
import dayjs from "dayjs";
import { callAPI } from "../../../axios/axiosInstance";
import { API_EMPLOYEE } from "./Constant";
import { uploadImageToCloudinary } from "../../../../uploadImage";
import { Cloud_Name, Upload_Preset } from "../../../Common/Constant";

const { Option } = Select;

const EditEmployee = ({ open, onClose, onUpdate, id }) => {
  const [form] = Form.useForm();
  const [passWord, setPassWord] = useState(false);
  const [isPassWordConfirm, setIsPassWordConfirm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState([]);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const data = await callAPI("get", API_EMPLOYEE.position);
        setPositions(data);
      } catch (err) {
        console.error("Error fetching positions:", err);
      }
    };

    const fetchEmployee = async () => {
      try {
        if (!id) return;
        const data = await callAPI(
          "get",
          `${API_EMPLOYEE.getEmployee}/${id}`
        );
        form.setFieldsValue({
          ...data,
          birthday: dayjs(data.birthday),
        });
        form.setFieldsValue({
            address: data.address,
            birthday: dayjs(data.birthday),
            cardId: data.cardId,
            confirmPassword: data.account?.password, 
            email: data.email,
            fullName: data.fullName,
            gender: String(data.gender),
            password: data.account?.password,
            phoneNumber: data.phoneNumber,
            positionId: data.position?.id, // Đảm bảo lấy đúng ID của position
            username: data.account?.username,
          });
        setImageUrl(data.image);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    if (open) {
      fetchPositions();
      fetchEmployee();
    }
  }, [id, open, form]);

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
      const {
        address,
        birthday,
        cardId,
        confirmPassword,
        email,
        fullName,
        gender,
        password,
        phoneNumber,
        positionId,
        username,
      } = values;
      const position = positions.find((p) => (p.id = positionId));
      const birthdayValue = birthday.format("YYYY-MM-DD");
      const imageLink = image
        ? await uploadImageToCloudinary(image, Cloud_Name, Upload_Preset)
        : "";

      const employee = {
        address,
        cardId,
        confirmPassword,
        email,
        fullName,
        gender,
        image: imageLink,
        password,
        phoneNumber,
        position,
        username,
        birthday: birthdayValue,
        id,
      };

      onUpdate(employee);
      onClose();
    } catch (error) {
      message.error("Đã có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Chỉnh sửa nhân viên"
      width={680}
      onClose={onClose}
      open={open}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item name="image" label="Hình ảnh">
          <input type="file" onChange={(e) => handleImageChange(e)} />
          {imageUrl && <img src={imageUrl} alt="Uploaded" width="300px" />}
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
          <Input placeholder="Nhập tài khoản" disabled />
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
          name="positionId"
          label="Vị trí"
          rules={[{ required: true, message: "Vui lòng chọn vị trí" }]}
        >
          <Select placeholder="Chọn vị trí">
            {positions.map((item) => (
              <Option value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="birthday"
          label="Ngày sinh"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày sinh",
            },
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
            { max: 256, message: "Email không được quá 256 ký tự" },
          ]}
        >
          <Input placeholder="Nhập email" disabled />
        </Form.Item>

        <Form.Item
          name="cardId"
          label="CCCD"
          rules={[
            { required: true, message: "Vui lòng nhập CCCD" },
            { pattern: /^\d{9}$/, message: "CCCD phải có 9 chữ số" },
          ]}
        >
          <Input placeholder="Nhập CCCD" disabled/>
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
            Cập nhật
          </Button>
          <Button onClick={onClose} style={{ marginLeft: 10 }}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditEmployee;
