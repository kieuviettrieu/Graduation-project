import React, { useState, useEffect } from "react";
import { Drawer, Form, Input, Button, message } from "antd";
import { uploadImageToCloudinary } from "../../../../uploadImage";
import { Cloud_Name, Upload_Preset } from "../../../Common/Constant";
import { API_EMPLOYEE } from "../../ManageEmployees/jsx/Constant";
import { callAPI } from "../../../axios/axiosInstance";
import { API_CINEMA } from "./Constant";

const EditCinema = ({ open, onClose, onUpdate, id }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [cinema, setCinema] = useState(null);

  useEffect(() => {
    const fetchCinema = async () => {
      try {
        if (!id) return;
        const cinema = await callAPI(
          "get",
          `${API_CINEMA.getCinema}/${id}`
        );
        form.setFieldsValue({
          name: cinema?.name,
          address: cinema?.address,
          phoneNumber: cinema?.phoneNumber,
          imgUrl: cinema?.image,
        });
        setCinema(cinema);
        setImgUrl(cinema?.image);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };
    if (open) {
      fetchCinema();
    }
  }, [id, form, open]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setImgUrl(url);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const { name, address, phoneNumber } = values;
      const imageLink = image
        ? await uploadImageToCloudinary(image, Cloud_Name, Upload_Preset)
        : imgUrl;
      const updatedCinema = {
        ...cinema,
        name,
        address,
        phoneNumber,
        image: imageLink,
      };
      onUpdate(updatedCinema);
      onClose();
    } catch (error) {
      message.error("Đã có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Chỉnh sửa rạp chiếu phim"
      width={680}
      onClose={onClose}
      open={open}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="imgUrl"
          label="Hình ảnh"
          rules={[{ required: true, message: "Vui lòng chọn hình ảnh" }]}
        >
          <input type="file" onChange={handleImageChange} />
          {imgUrl && <img src={imgUrl} alt="Uploaded" width="300px" style={{marginTop: "15px"}} />}
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
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ" },
          ]}
        >
          <Input placeholder="Nhập địa chỉ" />
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

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật rạp
          </Button>
          <Button onClick={onClose} style={{ marginLeft: 10 }}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditCinema;
