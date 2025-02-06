import React from "react";

const UserProfile = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row">
          {/* Thông tin user */}
          <div className="col-lg-6">
            <div className="card p-4 shadow-sm text-center">
              <h3 className="fw-bold">Kiều Việt Triều</h3>
              <p className="text-muted">0943051861</p>
              <p className="text-muted">viettrieu123123@gmail.com</p>

              <div className="d-flex justify-content-between my-3">
                <div className="text-center">
                  <p className="fw-bold text-orange-500">Điểm tích lũy</p>
                  <p>340000</p>
                </div>
                <div className="text-center">
                  <p className="fw-bold text-orange-500">Điểm thưởng</p>
                  <p>10.2</p>
                </div>
              </div>

              <div className="mt-3">
                <a href="/doi-mat-khau.html" className="btn btn-outline-secondary w-100 mb-2">Đổi mật khẩu</a>
                <a href="/cap-nhat-tai-khoan.html" className="btn btn-outline-secondary w-100 mb-2">Cập nhật thông tin</a>
                <a href="/online-booking-check.html" className="btn btn-outline-secondary w-100 mb-2">Lịch sử giao dịch online</a>
                <a href="/chinh-sach/chinh-sach-thanh-toan-4.html" className="btn btn-outline-secondary w-100 mb-2">Chính sách thanh toán</a>
                <a href="/chinh-sach/dieu-khoan-bao-mat-1.html" className="btn btn-outline-secondary w-100">Chính sách thành viên</a>
              </div>
            </div>
          </div>

          {/* Lịch sử giao dịch */}
          <div className="col-lg-6 mt-4 mt-lg-0">
            <div className="card p-4 shadow-sm">
              <h3 className="fw-bold mb-3">Lịch sử giao dịch</h3>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-danger text-center">
                    <tr>
                      <th>Rạp</th>
                      <th>Tên phim</th>
                      <th>Tổng tiền</th>
                      <th>Điểm thưởng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>RIO Liên Chiểu Đà Nẵng</td>
                      <td>(T16) BỘ TỨ BÁO THỦ</td>
                      <td>340.000</td>
                      <td>10.2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
