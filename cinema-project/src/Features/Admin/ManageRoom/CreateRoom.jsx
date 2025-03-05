import React, { useState, useEffect } from "react";
import { Drawer, Form, Input, Select, Button, message } from "antd";
import { API_ROOM, API_CINEMA } from "./Constant";
import { callAPI } from "../../../axios/axiosInstance";
import { useLoading } from "../../../LoadingProvider";

const { Option } = Select;

const CreateRoom = ({ open, onClose, onCreate }) => {
  const { setLoading } = useLoading();
  const [form] = Form.useForm();
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        setLoading(true);
        const data = await callAPI("get", API_CINEMA.list);
        setCinemas(data);
      } catch (err) {
        console.error("Error fetching cinemas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCinemas();
  }, []);

  const handleCreate = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await callAPI("post", API_ROOM.addRoom, values);
      message.success("Phòng đã được tạo thành công!");
      form.resetFields();
      onCreate();
      onClose();
    } catch (error) {
      message.error("Đã có lỗi xảy ra khi tạo phòng!");
      console.error("Error creating room:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer title="Tạo phòng mới" width={500} onClose={onClose} open={open}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên phòng"
          rules={[{ required: true, message: "Vui lòng nhập tên phòng!" }]}
        >
          <Input placeholder="Nhập tên phòng" />
        </Form.Item>

        <Form.Item
          name="screen"
          label="Màn hình"
          rules={[{ required: true, message: "Vui lòng nhập loại màn hình!" }]}
        >
          <Input placeholder="Nhập loại màn hình" />
        </Form.Item>

        <Form.Item
          name="cinemaId"
          label="Rạp phim"
          rules={[{ required: true, message: "Vui lòng chọn rạp phim!" }]}
        >
          <Select placeholder="Chọn rạp phim">
            {cinemas.map((cinema) => (
              <Option key={cinema.id} value={cinema.id}>
                {cinema.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleCreate}>
            Tạo phòng
          </Button>
          <Button onClick={onClose} style={{ marginLeft: 10 }}>
            Hủy bỏ
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateRoom;
