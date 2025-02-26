import React, { useState, useEffect } from "react";
import axios from "axios";

const AccountInfo = () => {
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    gender: true,
    birthday: "",
    email: "",
    phoneNumber: "",
    address: "",
    cardId: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Gọi API lấy dữ liệu tài khoản
  useEffect(() => {
    axios
      .get("https://api.example.com/user") // Thay thế URL API thật
      .then((response) => {
        const data = response.data;
        setFormData({
          id: data.id,
          fullName: data.fullName,
          gender: data.gender,
          birthday: data.birthday.split("T")[0], // Chuyển định dạng ngày
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: data.address,
          cardId: data.cardId,
        });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "radio" ? value === "true" : value,
    });
  };

  // Xử lý cập nhật dữ liệu
  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    axios
      .post("https://api.example.com/user/update", formData) // Thay thế URL API thật
      .then(() => {
        alert("Cập nhật thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật:", error);
        alert("Cập nhật thất bại!");
      })
      .finally(() => {
        setSaving(false);
      });
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div className="card">
      <div className="bg-light card-header shadow p-3 mb-4 text-uppercase font-weight-bold">
        <h5>THÔNG TIN TÀI KHOẢN</h5>
      </div>
      <div className="card-body divider my-3">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label text-end">Mã thành viên</label>
            <div className="col-sm-4">
              <input className="form-control" name="id" value={formData.id} readOnly />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-3 col-form-label text-end">
              Họ Tên<span style={{ color: "red" }}> *</span>
            </label>
            <div className="col-sm-4">
              <input className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-3 col-form-label text-end">
              Ngày Sinh<span style={{ color: "red" }}> *</span>
            </label>
            <div className="col-sm-4">
              <input className="form-control" type="date" name="birthday" value={formData.birthday} onChange={handleChange} />
            </div>
          </div>

          <div className="row mb-3">
            <legend className="col-form-label col-sm-3 text-end">
              Giới Tính<span style={{ color: "red" }}> *</span>
            </legend>
            <div className="col-sm-4 text-start">
              <input type="radio" name="gender" value="true" checked={formData.gender === true} onChange={handleChange} /> Nam
              <input type="radio" name="gender" value="false" checked={formData.gender === false} onChange={handleChange} style={{ marginLeft: "10px" }} /> Nữ
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-3 col-form-label text-end">
              CMND<span style={{ color: "red" }}> *</span>
            </label>
            <div className="col-sm-4">
              <input className="form-control" name="cardId" value={formData.cardId} onChange={handleChange} />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-3 col-form-label text-end">
              Email<span style={{ color: "red" }}> *</span>
            </label>
            <div className="col-sm-4">
              <input className="form-control" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-3 col-form-label text-end">
              Địa Chỉ<span style={{ color: "red" }}> *</span>
            </label>
            <div className="col-sm-4">
              <input className="form-control" name="address" value={formData.address} onChange={handleChange} />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-3 col-form-label text-end">
              Số Điện Thoại<span style={{ color: "red" }}> *</span>
            </label>
            <div className="col-sm-4">
              <input className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-3 col-form-label"></label>
            <div className="col-sm-9 text-start">
              <button className="btn btn-primary border-0" style={{ backgroundColor: "#f26b38" }} type="submit" disabled={saving}>
                {saving ? "Đang lưu..." : "Cập nhật"}
              </button>
              <button className="btn btn-secondary border-0" style={{ marginLeft: "5px" }} type="button">
                <a href="/" style={{ color: "#eeeeee", textDecoration: "none" }}>Quay lại</a>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountInfo;
