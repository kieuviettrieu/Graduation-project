import { useState } from "react";
import { uploadImageToCloudinary } from "../../../uploadImage";
import { Cloud_Name, Upload_Preset } from "../../Common/Constant";
import "../Contents/Event.css";
import { useLoading } from "../../../LoadingProvider";

const Event = (props) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { setLoading } = useLoading();

  // Xử lý khi chọn ảnh
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  // Gửi ảnh lên Cloudinary
  const handleUpload = async () => {
    try {
      setLoading(true);
      const url = await uploadImageToCloudinary(
        image,
        Cloud_Name,
        Upload_Preset
      );
      setImageUrl(url);
      alert("Upload thành công!");
    } catch (error) {
      alert("Upload thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Ảnh Lên Cloudinary</h2>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" width="300px" />}
    </div>
  );
};

export default Event;
