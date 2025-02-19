import React, { useState } from "react";
import { Drawer, Form, Input, Button, message, Upload } from "antd";
import { uploadImageToCloudinary } from "../../../../uploadImage";
import { Cloud_Name, Upload_Preset } from "../../../Common/Constant";
import { UploadOutlined } from "@ant-design/icons";

const CreateCinema = ({ open, onClose, onCreate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  const handleImageChange = (info) => {
    if (info.file && info.file instanceof File) {
      const file = info.file;
      setImage(file);
      const url = URL.createObjectURL(file);
      setImgUrl(url);
      form.setFieldsValue({ image: file });
    } else {
      console.error("File không hợp lệ:", info.file);
      message.error("Không thể xử lý tệp được tải lên.");
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const { name, address, phone } = values;
      const imageLink = image
        ? await uploadImageToCloudinary(image, Cloud_Name, Upload_Preset)
        : "";
      const cinema = {
        name,
        address,
        phoneNumber: phone,
        image: imageLink,
      };
      onCreate(cinema);
      form.resetFields();
      setImage(null);
      setImgUrl('');
      onClose();
    } catch (error) {
      message.error("Đã có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Thêm rạp chiếu phim"
      width={680}
      onClose={onClose}
      open={open}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="image"
          label="Hình ảnh"
          rules={[{ required: true, message: "Vui lòng chọn hình ảnh" }]}
        >
          <Upload
            beforeUpload={() => false}
            showUploadList={false}
            onChange={(e) => handleImageChange(e)}
          >
            <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
          </Upload>
          {imgUrl && <img src={imgUrl} alt="Uploaded" width="300px" style={{marginLeft: "15px"}}/>}
        </Form.Item>

        <Form.Item
          name="name"
          label="Tên rạp"
          rules={[
            { required: true, message: "Vui lòng nhập tên rạp" },
            {
              pattern:
                /^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$/,
              message: "Tên rạp không hợp lệ",
            },
          ]}
        >
          <Input placeholder="Nhập tên rạp" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input placeholder="Nhập địa chỉ" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            { pattern: /^(0\d{9,10})$/, message: "Số điện thoại không hợp lệ" },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Thêm rạp
          </Button>
          <Button onClick={onClose} style={{ marginLeft: 10 }}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateCinema;
