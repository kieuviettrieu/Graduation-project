import React from "react";

const RegisterForm = () => {
  const handleRegister = (event) => {
    event.preventDefault();
    console.log("Đăng ký tài khoản");
    // Thêm logic xử lý đăng ký tại đây
  };

  return (
    <section className="sidebar-page-container">
      <div className="auto-container">
        <div className="row clearfix">
          <div className="col-md-6 d-flex align-items-center py-5" style={{ margin: "0 auto" }}>
            <div className="container my-auto py-4 shadow-lg bg-white">
              <div className="row">
                <div className="col-11 col-lg-10 mx-auto">
                  <h3 className="text-9 fw-600 text-center my-3">Đăng ký tài khoản</h3>
                  <p className="text-center mb-4">
                    Đăng nhập? <a href="dang-nhap.html"><u>tại đây</u></a>
                  </p>
                  <form className="form" onSubmit={handleRegister}>
                    <div className="mb-3">
                      <label className="form-label text-dark fw-600" htmlFor="rgFullName">
                        Họ tên <b style={{ color: "red" }}>(*)</b>
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-0"
                        id="rgFullName"
                        required
                        placeholder="Họ tên"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-dark fw-600" htmlFor="rgEmail">
                        Email <b style={{ color: "red" }}>(*)</b>
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-0"
                        id="rgEmail"
                        required
                        placeholder="Email"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-dark fw-600" htmlFor="rgBirthDay">
                        Ngày sinh <b style={{ color: "red" }}>(*)</b>
                      </label>
                      <input
                        type="date"
                        className="form-control rounded-0"
                        id="rgBirthDay"
                        required
                        placeholder="Ngày sinh"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-dark fw-600" htmlFor="rgCMND">
                        CMND <b style={{ color: "red" }}>(*)</b>
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-0"
                        id="rgCMND"
                        required
                        placeholder="CMND"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-dark fw-600" htmlFor="rgPhone">
                        SĐT <b style={{ color: "red" }}>(*)</b>
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-0"
                        id="rgPhone"
                        required
                        placeholder="SĐT"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-dark fw-600" htmlFor="rgAddress">
                        Địa chỉ <b style={{ color: "red" }}>(*)</b>
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-0"
                        id="rgAddress"
                        required
                        placeholder="Địa chỉ"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-dark fw-600" htmlFor="rgPassword">
                        Mật khẩu <b style={{ color: "red" }}>(*)</b>
                      </label>
                      <input
                        type="password"
                        className="form-control rounded-0"
                        id="rgPassword"
                        required
                        placeholder="Nhập mật khẩu"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-dark fw-600" htmlFor="rgPasswordConfirm">
                        Nhập lại mật khẩu <b style={{ color: "red" }}>(*)</b>
                      </label>
                      <input
                        type="password"
                        className="form-control rounded-0"
                        id="rgPasswordConfirm"
                        required
                        placeholder="Nhập mật khẩu"
                      />
                    </div>

                    <div className="form-group">
                      <label className="radio-inline me-3">
                        <input
                          type="radio"
                          id="rgGenderTrue"
                          name="gender"
                          value="Nam"
                          defaultChecked
                        />
                        Nam
                      </label>
                      <label className="radio-inline">
                        <input
                          type="radio"
                          id="rgGenderFalse"
                          name="gender"
                          value="Nữ"
                        />
                        Nữ
                      </label>
                    </div>

                    <p style={{ color: "#333" }}>
                      Vui lòng nhập đầy đủ thông tin vào các trường có đánh dấu
                      <b style={{ color: "red" }}>(*)</b>
                    </p>

                    <div className="d-grid my-4">
                      <button className="btn btn-dark rounded-0" type="submit">
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

export default RegisterForm;
