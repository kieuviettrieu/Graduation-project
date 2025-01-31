import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import PropTypes from "prop-types";
import "../Contents/CardTheater.css";
import { generateUrl, ROUTER_PATHS } from "../../Common/Constant";
import { useNavigate } from 'react-router-dom';

const CardTheater = ({ cinemas, tabs }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const navigate = useNavigate();

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
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
              <p>{tab.content}</p>
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
                onClick={() => handleToggle(index)}
              >
                <div className="icon-outer">
                  {/* <span className="icon icon-plus fa fa-plus"></span> */}
                  {/* <span className="icon icon-minus fa fa-minus"></span> */}
                  <FaPlus className="icon icon-plus"/>
                  <FaMinus className="icon icon-minus"/>
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
                {cinema.dates.map((date, i) => (
                  <div className="content" key={`${date.date}-${i}`}>
                    <span className="time date">{date.date}</span>
                    {date.times.map((time) => (
                      <a
                        href={generateUrl(ROUTER_PATHS.BOOKING, {
                            timeId: time?.id,
                          })}
                        className="time-link"
                        key={time.id}
                      >
                        <span className="time item">{time.time}</span>
                      </a>
                    ))}
                    {i < cinema.dates.length - 1 && <hr />}
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

CardTheater.propTypes = {
  cinemas: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      filmName: PropTypes.string.isRequired,
      dates: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string.isRequired,
          times: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              time: PropTypes.string.isRequired,
            })
          ).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default CardTheater;
