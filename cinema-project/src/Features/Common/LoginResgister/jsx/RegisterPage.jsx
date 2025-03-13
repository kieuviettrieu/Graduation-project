import React from "react";
import { Form, Input, Radio, DatePicker, Button, message } from "antd";
import { callAPI } from "../../../axios/axiosInstance";
import { API_COMMON } from "../../Constant";
import dayjs from "dayjs";
import { useLoading } from "../../../../LoadingProvider";
import useCommonFunctions from "../../CommonFunction";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const { setLoading } = useLoading();
  const { redirectToPath } = useCommonFunctions();

  const handleRegister = async (values) => {
    const payload = {
      username: values.email,
      password: values.password,
      fullName: values.fullName,
      birthday: values.birthDate.format("YYYY-MM-DD"),
      gender: values.gender === "Nam",
      card: values.card,
      email: values.email,
      address: values.address,
      phoneNumber: values.phone,
    };

    try {
      setLoading(true);
      const response = await callAPI(
        "post",
        API_COMMON.public.register,
        payload
      );
      message.success("Đăng ký thành công!");
      redirectToPath("/login");
      form.resetFields();
    } catch (error) {
      message.error("Lỗi kết nối đến máy chủ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sidebar-page-container">
      <div className="auto-container">
        <div className="row clearfix">
          <div
            className="col-md-6 d-flex align-items-center py-5"
            style={{ margin: "0 auto" }}
          >
            <div className="container my-auto py-4 shadow-lg bg-white">
              <div className="row">
                <div className="col-11 col-lg-10 mx-auto">
                  <h4 className="text-center my-3">Đăng ký tài khoản</h4>
                  <p className="text-center mb-4">
                    Đăng nhập?{" "}
                    <a href="/login">
                      <u>tại đây</u>
                    </a>
                  </p>

                  <Form form={form} layout="vertical" onFinish={handleRegister}>
                    <Form.Item
                      name="fullName"
                      label="Họ tên"
                      rules={[
                        { required: true, message: "Vui lòng nhập họ tên" },
                      ]}
                    >
                      <Input placeholder="Họ tên" />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Email không hợp lệ",
                        },
                      ]}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                      name="birthDate"
                      label="Ngày sinh"
                      rules={[
                        { required: true, message: "Vui lòng chọn ngày sinh" },
                        {
                          validator: (_, value) => {
                            if (!value) {
                              return Promise.resolve();
                            }
                            return dayjs().diff(value, "years") >= 16
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error("Nhân viên phải trên 16 tuổi")
                                );
                          },
                        },
                      ]}
                    >
                      <DatePicker format="YYYY-MM-DD" className="w-100" />
                    </Form.Item>

                    <Form.Item
                      name="card"
                      label="CMND"
                      rules={[
                        { required: true, message: "Vui lòng nhập CMND" },
                        {
                          pattern: /^\d{9}$/,
                          message: "CCCD phải có 9 chữ số",
                        },
                      ]}
                    >
                      <Input placeholder="CMND" />
                    </Form.Item>

                    <Form.Item
                      name="phone"
                      label="SĐT"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại",
                        },
                        {
                          pattern: /^(0\d{9,10})$/,
                          message: "Số điện thoại không hợp lệ",
                        },
                      ]}
                    >
                      <Input placeholder="SĐT" />
                    </Form.Item>

                    <Form.Item
                      name="address"
                      label="Địa chỉ"
                      rules={[
                        { required: true, message: "Vui lòng nhập địa chỉ" },
                      ]}
                    >
                      <Input placeholder="Địa chỉ" />
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
                      <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <Form.Item
                      name="confirmPassword"
                      label="Nhập lại mật khẩu"
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập lại mật khẩu",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            return value && value === getFieldValue("password")
                              ? Promise.resolve()
                              : Promise.reject("Mật khẩu không khớp");
                          },
                        }),
                      ]}
                    >
                      <Input.Password placeholder="Nhập lại mật khẩu" />
                    </Form.Item>

                    <Form.Item
                      name="gender"
                      label="Giới tính"
                      rules={[
                        { required: true, message: "Vui lòng chọn giới tính" },
                      ]}
                    >
                      <Radio.Group>
                        <Radio value="Nam">Nam</Radio>
                        <Radio value="Nữ">Nữ</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <p className="text-muted">
                      Vui lòng nhập đầy đủ thông tin vào các trường có đánh dấu{" "}
                      <b className="text-danger">(*)</b>
                    </p>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="w-100"
                      >
                        Đăng ký
                      </Button>
                    </Form.Item>
                  </Form>

                  <p className="text-center">
                    <a href="#">
                      <u>Quên mật khẩu?</u>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
