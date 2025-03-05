import React, { useState, useEffect } from "react";
import { Drawer, Form, Input, Button, DatePicker, message, Select } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import { uploadImageToCloudinary } from "../../../../uploadImage";
import { Cloud_Name, Upload_Preset } from "../../../Common/Constant";
import { callAPI } from "../../../axios/axiosInstance";
import { API_FILM } from "./Constant";
import { useLoading } from "../../../../LoadingProvider";

const { Option } = Select;

const EditFilm = ({ open, onClose, onUpdate, id }) => {
  const [form] = Form.useForm();
  const { setLoading } = useLoading();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [movieTypes, setMovieTypes] = useState([]);
  const [movieActors, setMovieActors] = useState([]);
  const [movieDirectors, setMovieDirectors] = useState([]);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const { data } = await callAPI("get", `${API_FILM.getMovies}/${id}`);
        form.setFieldsValue({
          name: data.name,
          movieStudio: data.movieStudio,
          startDay: dayjs(data.startDay),
          timeAmount: data.timeAmount,
          movieActor: data.movieActor,
          movieType: data.movieType,
          movieDirector: data.movieDirector,
          trailerLink: data.trailerLink,
        });
        setImageUrl(data.image);
      } catch (error) {
        console.error("Error fetching film:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchOptions = async () => {
      try {
        setLoading(true);
        const typesRes = await callAPI("get", API_FILM.getMovieTypes);
        const actorsRes = await callAPI("get", API_FILM.getMovieActors);
        const directorsRes = await callAPI("get", API_FILM.getMovieDirectors);
        setMovieTypes(typesRes.data);
        setMovieActors(actorsRes.data);
        setMovieDirectors(directorsRes.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchFilm();
      fetchOptions();
    }
  }, [id, open, form]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const {
        name,
        movieStudio,
        startDay,
        timeAmount,
        movieActor,
        movieType,
        movieDirector,
        trailerLink,
      } = values;
      const startDayValue = startDay.format("YYYY-MM-DD");
      const imageLink = image
        ? await uploadImageToCloudinary(image, Cloud_Name, Upload_Preset)
        : imageUrl;

      const filmData = {
        name,
        movieStudio,
        startDay: startDayValue,
        timeAmount,
        image: imageLink,
        movieActor,
        movieType,
        movieDirector,
        trailerLink,
        id,
      };

      onUpdate(filmData);
      onClose();
    } catch (error) {
      message.error("Đã có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer title="Chỉnh sửa phim" width={680} onClose={onClose} open={open}>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="image"
          label="Hình ảnh"
          rules={[{ required: true, message: "Vui lòng chọn hình ảnh" }]}
        >
          <input type="file" onChange={handleImageChange} />
          {imageUrl && <img src={imageUrl} alt="Uploaded" width="300px" />}
        </Form.Item>

        <Form.Item
          name="name"
          label="Tên phim"
          rules={[{ required: true, message: "Vui lòng nhập tên phim" }]}
        >
          <Input placeholder="Nhập tên phim" disabled/>
        </Form.Item>

        <Form.Item
          name="movieStudio"
          label="Hãng phim"
          rules={[{ required: true, message: "Vui lòng nhập hãng phim" }]}
        >
          <Input placeholder="Nhập hãng phim" />
        </Form.Item>

        <Form.Item
          name="startDay"
          label="Ngày khởi chiếu"
          rules={[{ required: true, message: "Vui lòng chọn ngày khởi chiếu" }]}
        >
          <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="timeAmount"
          label="Thời lượng phim (phút)"
          rules={[{ required: true, message: "Vui lòng nhập thời lượng phim" }]}
        >
          <Input type="number" placeholder="Nhập thời lượng phim" min={1} />
        </Form.Item>

        <Form.Item
          name="trailerLink"
          label="Link Trailer"
          rules={[
            { required: true, message: "Vui lòng nhập link trailer" },
            {
              type: "url",
              message: "Vui lòng nhập đường dẫn hợp lệ",
            },
          ]}
        >
          <Input placeholder="Nhập link trailer (VD: https://www.youtube.com/...)" />
        </Form.Item>

        <Form.Item
          name="movieType"
          label="Thể loại"
          rules={[{ required: true, message: "Vui lòng chọn thể loại phim" }]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn thể loại"
            options={movieTypes.map((type) => ({
              label: type.name,
              value: type.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="movieActor"
          label="Diễn viên"
          rules={[{ required: true, message: "Vui lòng chọn diễn viên" }]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn diễn viên"
            options={movieActors.map((actor) => ({
              label: actor.name,
              value: actor.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="movieDirector"
          label="Đạo diễn"
          rules={[{ required: true, message: "Vui lòng chọn đạo diễn" }]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn đạo diễn"
            options={movieDirectors.map((director) => ({
              label: director.name,
              value: director.id,
            }))}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật phim
          </Button>
          <Button onClick={onClose} style={{ marginLeft: 10 }}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditFilm;
