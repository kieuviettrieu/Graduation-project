import React from "react";

const RegisterPage = () => {
  const handleRegister = () => {
    // Thêm logic xử lý đăng ký tại đây
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
                  <h4 className="text-9 fw-600 text-center my-3">
                    Đăng ký tài khoản
                  </h4>
                  <p className="text-center mb-4">
                    Đăng nhập?{" "}
                    <a href="login">
                      <u>tại đây</u>
                    </a>
                  </p>
                  <form class="form">
                    <div class="mb-3">
                      <label
                        class="form-label text-dark fw-bold"
                        for="rgFullName"
                      >
                        Họ tên <b class="text-danger">(*)</b>
                      </label>
                      <input
                        type="text"
                        class="form-control rounded-0"
                        id="rgFullName"
                        required
                        placeholder="Họ tên"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label text-dark fw-bold" for="rgEmail">
                        Email <b class="text-danger">(*)</b>
                      </label>
                      <input
                        type="email"
                        class="form-control rounded-0"
                        id="rgEmail"
                        required
                        placeholder="Email"
                      />
                    </div>

                    <div class="mb-3">
                      <label
                        class="form-label text-dark fw-bold"
                        for="rgBirthDay"
                      >
                        Ngày sinh <b class="text-danger">(*)</b>
                      </label>
                      <input
                        type="date"
                        class="form-control rounded-0"
                        id="rgBirthDay"
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <label class="form-label text-dark fw-bold" for="rgCMND">
                        CMND <b class="text-danger">(*)</b>
                      </label>
                      <input
                        type="text"
                        class="form-control rounded-0"
                        id="rgCMND"
                        required
                        placeholder="CMND"
                      />
                    </div>

                    <div class="mb-3">
                      <label class="form-label text-dark fw-bold" for="rgPhone">
                        SĐT <b class="text-danger">(*)</b>
                      </label>
                      <input
                        type="text"
                        class="form-control rounded-0"
                        id="rgPhone"
                        required
                        placeholder="SĐT"
                      />
                    </div>

                    <div class="mb-3">
                      <label
                        class="form-label text-dark fw-bold"
                        for="rgAddress"
                      >
                        Địa chỉ <b class="text-danger">(*)</b>
                      </label>
                      <input
                        type="text"
                        class="form-control rounded-0"
                        id="rgAddress"
                        required
                        placeholder="Địa chỉ"
                      />
                    </div>

                    <div class="mb-3">
                      <label
                        class="form-label text-dark fw-bold"
                        for="rgPassword"
                      >
                        Mật khẩu <b class="text-danger">(*)</b>
                      </label>
                      <input
                        type="password"
                        class="form-control rounded-0"
                        id="rgPassword"
                        required
                        placeholder="Nhập mật khẩu"
                      />
                    </div>

                    <div class="mb-3">
                      <label
                        class="form-label text-dark fw-bold"
                        for="rgPasswordConfirm"
                      >
                        Nhập lại mật khẩu <b class="text-danger">(*)</b>
                      </label>
                      <input
                        type="password"
                        class="form-control rounded-0"
                        id="rgPasswordConfirm"
                        required
                        placeholder="Nhập mật khẩu"
                      />
                    </div>

                    <div class="mb-3">
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          id="rgGenderTrue"
                          name="gender"
                          value="Nam"
                          checked
                        />
                        <label class="form-check-label" for="rgGenderTrue">
                          Nam
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          id="rgGenderFalse"
                          name="gender"
                          value="Nữ"
                        />
                        <label class="form-check-label" for="rgGenderFalse">
                          Nữ
                        </label>
                      </div>
                    </div>

                    <p class="text-muted">
                      Vui lòng nhập đầy đủ thông tin vào các trường có đánh dấu{" "}
                      <b class="text-danger">(*)</b>
                    </p>

                    <div class="d-grid my-4">
                      <button class="btn btn-dark rounded-0" type="submit">
                        Đăng ký
                      </button>
                    </div>
                  </form>

                  <p className="text-center">
                    <a href="forgot-pass.html">
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

export default RegisterPage;
