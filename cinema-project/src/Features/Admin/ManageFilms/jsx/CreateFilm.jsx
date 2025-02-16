import React, { useState, useEffect } from "react";
import {
  Drawer,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  message,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { callAPI } from "../../../axios/axiosInstance";
import { uploadImageToCloudinary } from "../../../../uploadImage";
import { Cloud_Name, Upload_Preset } from "../../../Common/Constant";
import { API_FILM } from "./Constant";

const { Option } = Select;

const CreateFilm = ({ open, onClose, onCreate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [movieTypes, setMovieTypes] = useState([]);
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [studios, setStudios] = useState([]);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const languages = ["English", "Vietnamese", "French", "Spanish", "Chinese"];

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const actorList = await callAPI("get", API_FILM.getMovieActors);
        const directorList = await callAPI("get", API_FILM.getMovieDirectors);
        const types = await callAPI("get", API_FILM.getMovieTypes);
        const studioList = await callAPI("get", API_FILM.getMovieStudios);
        setMovieTypes(types);
        setActors(actorList);
        setDirectors(directorList);
        setStudios(studioList);
      } catch (err) {
        console.error("Error fetching movie data:", err);
      }
    };
    if (open) {
      // form.resetFields();
      // setImage(null);
      // setImageUrl("");
      fetchMovieData();
    }
  }, [open]);

  const handleImageChange = (info) => {
    if (info.file && info.file instanceof File) {
      const file = info.file;
      setImage(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      form.setFieldsValue({ image: file });
    } else {
      console.error("File không hợp lệ:", info.file);
      message.error("Không thể xử lý tệp được tải lên.");
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
        trailer,
        description,
        language,
      } = values;
      const startDayValue = startDay.format("YYYY-MM-DD");
      const imageLink = image
        ? await uploadImageToCloudinary(image, Cloud_Name, Upload_Preset)
        : "";

      const film = {
        name,
        movieStudio,
        startDay: startDayValue,
        timeAmount,
        image: imageLink,
        movieActor,
        movieType,
        movieDirector,
        trailer,
        description,
        language,
      };
      onCreate(film);
      setImage(null);
      setImageUrl("");
      form.resetFields();
      onClose();
    } catch (error) {
      message.error("Đã có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer title="Thêm phim mới" width={680} onClose={onClose} open={open}>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="image"
          label="Hình ảnh"
          rules={[{ required: true, message: "Vui lòng chọn hình ảnh" }]}
        >
          <Upload
            beforeUpload={() => false}
            showUploadList={false}
            onChange={(e) => handleImageChange(e)}
          >
            <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
          </Upload>
          {imageUrl && <img src={imageUrl} alt="Uploaded" width="300px" />}
        </Form.Item>

        <Form.Item
          name="name"
          label="Tên phim"
          rules={[{ required: true, message: "Vui lòng nhập tên phim" }]}
        >
          <Input placeholder="Nhập tên phim" />
        </Form.Item>

        <Form.Item
          name="language"
          label="Ngôn ngữ"
          rules={[{ required: true, message: "Vui lòng chọn ngôn ngữ" }]}
        >
          <Select placeholder="Chọn ngôn ngữ">
            {languages.map((lang) => (
              <Option key={lang} value={lang}>
                {lang}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="movieStudio"
          label="Hãng phim"
          rules={[{ required: true, message: "Vui lòng chọn hãng phim" }]}
        >
          <Select mode="multiple" placeholder="Chọn hãng phim">
            {studios.map((studio) => (
              <Option key={studio.id} value={studio.id}>
                {studio.name}
              </Option>
            ))}
          </Select>
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
          name="trailer"
          label="Link Trailer"
          rules={[
            { required: true, message: "Vui lòng nhập link trailer" },
            { type: "url", message: "Vui lòng nhập đường dẫn hợp lệ" },
          ]}
        >
          <Input placeholder="Nhập link trailer (VD: https://www.youtube.com/...)" />
        </Form.Item>

        <Form.Item
          name="movieType"
          label="Thể loại phim"
          rules={[{ required: true, message: "Vui lòng chọn thể loại phim" }]}
        >
          <Select mode="multiple" placeholder="Chọn thể loại phim">
            {movieTypes.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="movieActor"
          label="Diễn viên"
          rules={[{ required: true, message: "Vui lòng chọn diễn viên" }]}
        >
          <Select mode="multiple" placeholder="Chọn diễn viên">
            {actors.map((actor) => (
              <Option key={actor.id} value={actor.id}>
                {actor.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="movieDirector"
          label="Đạo diễn"
          rules={[{ required: true, message: "Vui lòng chọn đạo diễn" }]}
        >
          <Select mode="multiple" placeholder="Chọn đạo diễn">
            {directors.map((director) => (
              <Option key={director.id} value={director.id}>
                {director.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea rows={3} placeholder="Nhập mô tả" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Thêm phim
          </Button>
          <Button onClick={onClose} style={{ marginLeft: 10 }}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateFilm;
