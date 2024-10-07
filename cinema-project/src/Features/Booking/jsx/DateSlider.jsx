import React, { useState } from "react";
import { Carousel } from "antd";

// Hàm tạo ra 7 ngày trong tuần hiện tại
const generateWeekDates = () => {
  const currentDate = new Date();
  const week = [];

  for (let i = 0; i < 7; i++) {
    const first = currentDate.getDate() - currentDate.getDay() + i;
    const day = new Date(currentDate.setDate(first));
    week.push(day);
  }
  return week;
};

const DateCarousel = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const weekDates = generateWeekDates();

  const handleDateClick = (date) => {
    setSelectedDate(date);
    console.log("Ngày đã chọn: ", date);
  };

  return (
    <div className="slide">
      <div className="slide-title">
        <a href="#" className="site slide-title-text">
          Chọn Ngày Trong Tuần
        </a>
      </div>

      {/* Carousel từ Ant Design */}
      <Carousel autoplay dots={true}>
        {weekDates.map((date, index) => (
          <div
            key={index}
            className="slide-date"
            onClick={() => handleDateClick(date)}
          >
            <h3>{date.toDateString()}</h3>
          </div>
        ))}
      </Carousel>

      <div className="selected-date">
        <h3>Ngày đã chọn: {selectedDate.toDateString()}</h3>
      </div>
    </div>
  );
};

export default DateCarousel;
