import React, { useState, useEffect } from "react";
import {
  Drawer,
  Form,
  Select,
  DatePicker,
  TimePicker,
  InputNumber,
  Button,
  message,
  Input,
} from "antd";
import { useLoading } from "../../../../LoadingProvider";
import { API_FILM } from "../../ManageFilms/jsx/Constant";
import { callAPI } from "../../../axios/axiosInstance";
import { API_COMMON, generateUrl } from "../../../Common/Constant";
import { API_SHOWTIME } from "./Constant";
import { API_CINEMA } from "../../ManageCinema/jsx/Constant";

const { Option } = Select;

const CreateShowTime = ({ open, onClose, onCreate }) => {
  const [form] = Form.useForm();
  const { setLoading } = useLoading();
  const [cinemas, setCinemas] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [roomEmpty, setRoomEmpty] = useState(false);
  const [endTime, setEndTime] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null); // Lưu startTime đã chọn

  useEffect(() => {
    if (open) {
      fetchCinemas();
      fetchMovies();
    }
  }, [open]);

  const fetchCinemas = async () => {
    try {
      const response = await callAPI("get", `${API_CINEMA.getCinemaAll}`);
      setCinemas(response);
    } catch (error) {
      message.error("Không thể tải danh sách rạp chiếu.");
    }
  };

  const fetchMovies = async () => {
    try {
      const movieData = await callAPI("get", `${API_FILM.getMovieAll}`);
      setMovies(movieData);
    } catch (error) {
      message.error("Không thể tải danh sách phim.");
    }
  };

  const fetchRooms = async (cinemaId) => {
    try {
      if (!cinemaId) {
        setRooms([]);
        setRoomEmpty(true);
        return;
      }
      const response = await callAPI(
        "get",
        generateUrl(API_COMMON.public.getRoomsByCinemaId, {
          cinemaId: cinemaId,
        })
      );
      setRooms(response);
      setRoomEmpty(response.length === 0);
    } catch (error) {
      message.error("Không thể tải danh sách phòng chiếu.");
    }
  };

  const handleCinemaChange = (cinemaId) => {
    form.setFieldsValue({ room: undefined });
    setSelectedRoom(null);
    setRooms([]);
    fetchRooms(cinemaId);
  };

  const handleMovieChange = (movieId) => {
    const movie = movies.find((m) => m.id === movieId);
    setSelectedMovie(movie);

    // Nếu đã chọn startTime, cập nhật lại endTime khi đổi phim
    if (selectedTime) {
      handleTimeChange(selectedTime, movie);
    }
  };

  const handleRoomChange = (roomId) => {
    setSelectedRoom(roomId);
  };

  const handleTimeChange = (time, movie = selectedMovie) => {
    setSelectedTime(time); // Lưu lại startTime

    if (time && movie) {
      const duration = movie.timeAmount + 20 || 120; // Default 120 minutes
      const endTime = time.clone().add(duration, "minutes");
      setEndTime(endTime.format("HH:mm"));
    } else {
      setEndTime("");
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const { movie, cinema, room, date, time, price } = values;
      const duration = selectedMovie?.timeAmount || 120;
      const endTimeComputed = time.clone().add(duration, "minutes");

      const showTime = {
        movieId: movie,
        roomId: room,
        date: date.format("YYYY-MM-DD"),
        startTime: time.format("HH:mm"),
        endTime: endTimeComputed.format("HH:mm"),
        price: price || null,
      };
      onCreate(showTime);
      form.resetFields();
      setSelectedMovie(null);
      setSelectedRoom(null);
      setEndTime("");
      setSelectedTime(null);
    } catch (error) {
      message.error("Đã có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Thêm suất chiếu"
      width={680}
      onClose={() => {
        onClose();
        form.resetFields();
        setSelectedMovie(null);
        setSelectedRoom(null);
        setEndTime("");
        setSelectedTime(null);
      }}
      open={open}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="movie"
          label="Chọn phim"
          rules={[{ required: true, message: "Vui lòng chọn phim" }]}
        >
          <Select placeholder="Chọn phim" onChange={handleMovieChange}>
            {movies.map((movie) => (
              <Option key={movie.id} value={movie.id}>
                {movie.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="cinema"
          label="Chọn rạp chiếu"
          rules={[{ required: true, message: "Vui lòng chọn rạp chiếu" }]}
        >
          <Select placeholder="Chọn rạp" onChange={handleCinemaChange}>
            {cinemas.map((cinema) => (
              <Option key={cinema.id} value={cinema.id}>
                {cinema.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="room"
          label="Chọn phòng chiếu"
          rules={[{ required: true, message: "Vui lòng chọn phòng chiếu" }]}
        >
          <Select
            placeholder="Chọn phòng"
            disabled={rooms.length === 0}
            onChange={handleRoomChange}
          >
            {rooms.map((room) => (
              <Option key={room.id} value={room.id}>
                {room.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {roomEmpty && (
          <p style={{ color: "red" }}>Không có phòng chiếu nào khả dụng</p>
        )}

        <Form.Item
          name="date"
          label="Chọn ngày chiếu"
          rules={[{ required: true, message: "Vui lòng chọn ngày chiếu" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            disabledDate={(current) => current && current < new Date()}
          />
        </Form.Item>

        <Form.Item
          name="time"
          label="Chọn giờ chiếu"
          rules={[{ required: true, message: "Vui lòng chọn giờ chiếu" }]}
        >
          <TimePicker
            format="HH:mm"
            style={{ width: "100%" }}
            onChange={(value) => handleTimeChange(value, selectedMovie)}
            disabled={!selectedMovie || !selectedRoom}
          />
        </Form.Item>

        <Form.Item label="Giờ kết thúc">
          <Input value={endTime} disabled style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá vé (nếu cần chỉnh)"
          rules={[{ required: true, message: "Vui lòng nhập giá vé" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            placeholder="Nhập giá vé"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm suất chiếu
          </Button>
          <Button onClick={onClose} style={{ marginLeft: 10 }}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateShowTime;
