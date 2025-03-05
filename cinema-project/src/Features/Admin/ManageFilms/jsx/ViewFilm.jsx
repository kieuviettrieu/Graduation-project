import React, { useState, useEffect } from "react";
import { Drawer, Descriptions, message } from "antd";
import dayjs from "dayjs";
import { callAPI } from "../../../axios/axiosInstance";
import { API_FILM } from "./Constant";
import { useLoading } from "../../../../LoadingProvider";

const ViewFilm = ({ open, onClose, id }) => {
  const { setLoading } = useLoading();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await callAPI("get", `${API_FILM.getMovieDetail}/${id}`);
        setFilm(data);
      } catch (error) {
        message.error("Không thể tải thông tin phim!");
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchFilm();
    }
  }, [id, open]);

  return (
    <Drawer title="Chi tiết phim" width={680} onClose={onClose} open={open}>
      {film ? (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Hình ảnh">
            {film?.image ? <img src={film.image} alt="phim" width="150px" /> : "Không có ảnh"}
          </Descriptions.Item>
          <Descriptions.Item label="Tên phim">{film.name}</Descriptions.Item>
          <Descriptions.Item label="Ngày khởi chiếu">
            {dayjs(film.startDay).format("DD/MM/YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Thời lượng (phút)">{film.timeAmount}</Descriptions.Item>
          <Descriptions.Item label="Mô tả">{film.description}</Descriptions.Item>
          <Descriptions.Item label="Trailer">
            <a href={film.trailer} target="_blank" rel="noopener noreferrer">
              Xem Trailer
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="Ngôn ngữ">{film.language}</Descriptions.Item>
          <Descriptions.Item label="Diễn viên">{film.actors}</Descriptions.Item>
          <Descriptions.Item label="Đạo diễn">{film.directors}</Descriptions.Item>
          <Descriptions.Item label="Thể loại">{film.movieTypes}</Descriptions.Item>
          <Descriptions.Item label="Hãng phim">{film.movieStudios}</Descriptions.Item>
          <Descriptions.Item label="Đánh giá trung bình">
            {film.avgRating ? film.avgRating.toFixed(1) : "Chưa có đánh giá"}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </Drawer>
  );
};

export default ViewFilm;
