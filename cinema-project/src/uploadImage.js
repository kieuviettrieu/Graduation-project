import axios from "axios";

/**
 * Hàm upload ảnh lên Cloudinary
 * @param {File} imageFile - File ảnh cần upload
 * @param {string} cloudName - Tên Cloudinary của bạn
 * @param {string} uploadPreset - Upload Preset của bạn
 * @returns {Promise<string>} - Trả về URL của ảnh đã upload
 */
export const uploadImageToCloudinary = async (imageFile, cloudName, uploadPreset) => {
  if (!imageFile) {
    throw new Error("Không có ảnh để upload!");
  }

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return response.data.secure_url; // Trả về URL ảnh đã upload
  } catch (error) {
    console.error("Lỗi khi upload ảnh:", error);
    throw new Error("Upload thất bại!");
  }
};
