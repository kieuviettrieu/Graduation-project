import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../../Redux/Actions";
import { callAPI } from "../../../axios/axiosInstance";
import { API_COMMON } from "../../Constant";
import { type } from "@testing-library/user-event/dist/type";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await callAPI("post", API_COMMON.public.login, {
        username: email,
        password: password,
      });

      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      const { username, roles, type } = response;

      const user = {
        username,
        roles,
        type,
      };
      dispatch(loginAction(user));
      return response;
    } catch (error) {
      console.error("Login failed", error);
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
                  <h4 className="text-9 fw-600 text-center my-3">Đăng nhập</h4>
                  <p className="text-center mb-4">
                    Đăng ký thành viên?{" "}
                    <a href="/register">
                      <u>tại đây</u>
                    </a>
                  </p>
                  <form
                    className="form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                  >
                    <div className="mb-3">
                      <label
                        className="form-label text-dark fw-bold"
                        htmlFor="lgEmail"
                      >
                        Tài khoản/Email
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-0"
                        id="lgEmail"
                        required
                        placeholder="Nhập tài khoản/ Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ fontSize: "14px" }}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        className="form-label text-dark fw-bold"
                        htmlFor="lgPassword"
                      >
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        className="form-control rounded-0"
                        id="lgPassword"
                        required
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ fontSize: "14px" }}
                      />
                    </div>

                    <div className="d-grid my-4">
                      <button className="btn btn-dark rounded-0" type="submit">
                        Đăng nhập
                      </button>
                    </div>
                  </form>

                  <p className="text-center">
                    <a href="/quen-mat-khau">
                      <u>Quên mật khẩu</u>
                    </a>
                    ?
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

export default LoginPage;
