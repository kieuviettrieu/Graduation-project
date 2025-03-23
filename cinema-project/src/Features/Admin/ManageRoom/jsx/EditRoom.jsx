import React, { useEffect } from "react";
import { Drawer, Form, Input, Button, message } from "antd";
import { useLoading } from "../../../../LoadingProvider";

const EditRoom = ({ open, onClose, onEdit, roomData }) => {
  const { setLoading } = useLoading();
  const [form] = Form.useForm();

  useEffect(() => {
    if (roomData) {
      form.setFieldsValue({
        name: roomData.name,
        screen: roomData.screen,
        cinema: roomData.cinema.name,
      });
    }
  }, [roomData, form]);

  const handleEdit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const { name, screen } = values;
      onEdit({ name, screen }); 
      onClose();
    } catch (error) {
      message.error("Đã có lỗi xảy ra khi cập nhật phòng!");
      console.error("Error updating room:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer title="Chỉnh sửa phòng" width={500} onClose={onClose} open={open}>
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
          name="cinema"
          label="Rạp phim"
        >
          <Input placeholder="Rạp" disabled/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleEdit}>
            Cập nhật
          </Button>
          <Button onClick={onClose} style={{ marginLeft: 10 }}>
            Hủy bỏ
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditRoom;
