import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import PropTypes from "prop-types";
import "../Contents/CardTheater.css";
import { API_COMMON, generateUrl, ROUTER_PATHS } from "../../Common/Constant";
import { useNavigate } from "react-router-dom";
import { callAPI } from "../../axios/axiosInstance";
import { useLoading } from "../../../LoadingProvider";

const CardTheater = ({ cinemas, tabs, filmId }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showTimes, setShowTimes] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const { setLoading } = useLoading();

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const formatShowTimes = (data) => {
    const formattedData = {};
  
    data.forEach((show, index) => {
      const dateObj = new Date(show.date);
      const formattedDate = dateObj.toLocaleDateString("en-GB");
  
      if (!formattedData[formattedDate]) {
        formattedData[formattedDate] = { date: formattedDate, times: [] };
      }
  
      formattedData[formattedDate].times.push({
        id: show.id,
        time: show.startTime.split(":").slice(0, 2).join(":") 
      });
    });

    Object.values(formattedData).forEach((entry) => {
      entry.times.sort((a, b) => {
        return a.time.localeCompare(b.time); 
      });
    });
  
    return Object.values(formattedData) ;
  }

  const handleToggle = async (cinemaId, index) => {
    setLoading(true);
    const showTimeData = await callAPI(
      "get",
      generateUrl(API_COMMON.public.getShowTimeByMovieAndCinema, {
        idMovie: filmId,
        idCinema: cinemaId,
      })
    );
    setLoading(false);
    setShowTimes(formatShowTimes(showTimeData));
    setActiveIndex(activeIndex === index ? null : index);
  };

  const isDateTimeGreaterThanNow = (timeString, dateString) => {
    const [inputHours, inputMinutes] = timeString.split(":").map(Number);
    const [day, month, year] = dateString.split("/").map(Number);

    const inputDateTime = new Date(year, month - 1, day, inputHours, inputMinutes);
    const now = new Date();

    return inputDateTime > now;
};

  return (
    <div className="prod-tabs tabs-box">
      <ul className="tab-btns tab-buttons clearfix">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            data-tab={`#${tab.id}`}
            className={`tab-btn ${activeTab === tab.id ? "active-btn" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
          </li>
        ))}
      </ul>
      <div className="tabs-content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={tab.id}
            className={`tab ${activeTab === tab.id ? "active-tab" : ""}`}
          >
            <div className="content">
              <p>{tab?.content}</p>
            </div>
          </div>
        ))}
        <ul className="accordion-box style-two">
          {cinemas.map((cinema, index) => (
            <li
              className={`accordion block ${
                activeIndex === index ? "active-block" : ""
              }`}
              key={cinema.name}
            >
              <div
                className={`acc-btn ${activeIndex === index ? "active" : ""}`}
              >
                <div className="icon-outer" onClick={() => handleToggle(cinema?.id, index)}>
                  <FaPlus className="icon icon-plus" />
                  <FaMinus className="icon icon-minus" />
                </div>
                {cinema.name}
                <br />
                <small style={{ fontSize: 13, color: "#333", fontWeight: 400 }}>
                  {cinema.address}
                </small>
              </div>
              <div
                className="acc-content"
                style={{ display: activeIndex === index ? "block" : "none" }}
              >
                {showTimes &&
                  showTimes.map((date, i) => (
                    <div className="content" key={`${date.date}-${i}`}>
                      <span className="time date" style={{backgroundColor: "#444444"}}>{date.date}</span>
                      {date.times.map((time) => {
                        const isAllowed = isDateTimeGreaterThanNow(time.time, date.date);
                        return (
                        <a
                          href={isAllowed && generateUrl(ROUTER_PATHS.BOOKING, {
                            timeId: time?.id
                          })}
                          className="time-link"
                          key={time.id}
                        >
                          <span className={isAllowed ? "time item" : "time past item"}>{time.time}</span>
                        </a>
                      )})}
                      {i < showTimes.length - 1 && <hr />}
                    </div>
                  ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardTheater;
