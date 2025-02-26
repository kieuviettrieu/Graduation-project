import React, { useState } from "react";
import TicketHistory from "./TicketHistory";
import PointHistory from "./PointHistory";
import AccountInfo from "./AccountInfo";

const UserProfile = () => {
  const [choose, setChoose] = useState(3);
  const switchModule = (value) => {
    switch (value) {
      case 1:
        return 
          <AccountInfo />

      case 2:
        return <AccountInfo />;
      case 3:
        return <div className="card p-4 shadow-sm">
        <h4 className="fw-bold mb-3">Lịch sử giao dịch</h4>
        <div className="table-responsive">
          <TicketHistory />
        </div>
      </div>;
      case 4:
        return <div className="card p-4 shadow-sm">
        <h4 className="fw-bold mb-3">Lịch sử điểm thưởng</h4>
        <div className="table-responsive">
          <PointHistory />
        </div>
      </div>;
      default:
        return ;
    }
  }

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
                <a className="btn btn-outline-secondary w-100 mb-2" style={choose === 1 && {backgroundColor: "#6c757d", color: "white"} || {}} onClick={() => setChoose(1)}>Đổi mật khẩu</a>
                <a className="btn btn-outline-secondary w-100 mb-2" style={choose === 2 && {backgroundColor: "#6c757d", color: "white"} || {}} onClick={() => setChoose(2)}>Cập nhật thông tin</a>
                <a className="btn btn-outline-secondary w-100 mb-2" style={choose === 3 && {backgroundColor: "#6c757d", color: "white"} || {}} onClick={() => setChoose(3)}>Lịch sử giao dịch online</a>
                <a className="btn btn-outline-secondary w-100 mb-2" style={choose === 4 && {backgroundColor: "#6c757d", color: "white"} || {}} onClick={() => setChoose(4)}>Lịch sử điểm thưởng</a>
              </div>
            </div>
          </div>

          {/* Lịch sử giao dịch */}
          <div className="col-lg-6 mt-4 mt-lg-0">
            {switchModule(choose)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
