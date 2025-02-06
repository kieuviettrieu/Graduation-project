import React, { useState } from "react";

const CinemaCreate = () => {
  const [cinema, setCinema] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    image: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCinema({ ...cinema, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu đến server (thay URL bằng API thật)
    fetch("http://localhost:8080/api/cinemas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cinema),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage("Rạp chiếu phim đã được tạo thành công!");
        setCinema({ name: "", address: "", phoneNumber: "", image: "" });
      })
      .catch((error) => setMessage("Có lỗi xảy ra, vui lòng thử lại!"));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Tạo Rạp Chiếu Phim</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Tên Rạp</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={cinema.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Địa Chỉ</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={cinema.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Số Điện Thoại</label>
          <input
            type="tel"
            className="form-control"
            name="phoneNumber"
            value={cinema.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Hình Ảnh (URL)</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={cinema.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Tạo Rạp
        </button>
      </form>
    </div>
  );
};

export default CinemaCreate;
