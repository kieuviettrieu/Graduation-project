import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { callAPI } from "../../../axios/axiosInstance";
import { API_COMMON } from "../../Constant";
import { useSelector } from "react-redux";
import { useLoading } from "../../../../LoadingProvider";

const ChangePassword = () => {
  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const username = user?.username || "";
  const [passWord, setPassWord] = useState("");
  const [isPassWordConfirm, setIsPassWordConfirm] = useState(true);
  const { setLoading } = useLoading();

  useEffect(() => {
    form.setFieldsValue({
      nowPass: "",
      password: "",
      confirmPassword: "",
    });
  }, [form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { nowPass, password, confirmPassword } = values;

      if (password !== confirmPassword) {
        message.error("Mật khẩu mới và nhập lại mật khẩu không khớp!");
        return;
      }

      await callAPI("put", API_COMMON.public.changePassword, {
        username,
        oldPassword: nowPass,
        password: password,
        confirmPassword: password,
      });

      message.success("Đổi mật khẩu thành công!");
      form.resetFields();
    } catch (error) {
      message.error("Đã có lỗi xảy ra khi đổi mật khẩu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="THÔNG TIN ĐĂNG NHẬP"
      className="shadow"
      initialValues={{
        nowPass: "",
        password: "",
        confirmPassword: "",
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Tài Khoản">
          <Input value={username} readOnly />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="nowPass"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới!" },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
            },
          ]}
        >
          <Input.Password
            onChange={(item) => setPassWord(item?.target?.value)}
          />
        </Form.Item>

        <Form.Item
          label="Nhập lại mật khẩu"
          name="confirmPassword"
          rules={[{ required: true, message: "Vui lòng nhập lại mật khẩu!" }]}
          help={!isPassWordConfirm ? "Mật khẩu xác nhận không khớp" : ""}
        >
          <Input.Password
            onChange={(e) => setIsPassWordConfirm(e.target.value === passWord)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#f26b38", border: "none" }}
          >
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangePassword;
