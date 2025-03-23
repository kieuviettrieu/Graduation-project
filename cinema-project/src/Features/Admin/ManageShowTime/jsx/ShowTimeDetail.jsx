import React, { useEffect, useState } from "react";
import { Drawer, Descriptions, Button, message } from "antd";
import { callAPI } from "../../../axios/axiosInstance";
import { useLoading } from "../../../../LoadingProvider";
import { API_COMMON, formatDate, generateUrl } from "../../../Common/Constant";

const ShowTimeDetail = ({ id, open, onClose }) => {
  const [showTime, setShowTime] = useState(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchShowTime = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const showTimeData = await callAPI(
          "get",
          generateUrl(API_COMMON.public.getShowTime, { id: id })
        );
        setShowTime(showTimeData);
      } catch (error) {
        message.error("Không thể tải thông tin phim!");
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchShowTime();
    }
  }, [id, open]);

  return (
    <Drawer
      title="Chi tiết suất chiếu"
      width={480}
      onClose={onClose}
      open={open}
    >
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="ID">{showTime?.id}</Descriptions.Item>
        <Descriptions.Item label="Ngày chiếu">
          {formatDate(showTime?.date)}
        </Descriptions.Item>
        <Descriptions.Item label="Giờ bắt đầu">
          {showTime?.startTime}
        </Descriptions.Item>
        <Descriptions.Item label="Giờ kết thúc">
          {showTime?.endTime}
        </Descriptions.Item>
        <Descriptions.Item label="Tình trạng">
          {showTime?.soldOut ? "Hết vé" : "Còn vé"}
        </Descriptions.Item>
        <Descriptions.Item label="Tên phim">{showTime?.movie?.name}</Descriptions.Item>
      </Descriptions>
      <Button onClick={onClose} style={{ marginTop: 16 }}>
        Đóng
      </Button>
    </Drawer>
  );
};

export default ShowTimeDetail;
