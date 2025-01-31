import React, { useState, useEffect } from "react";
import "../Contents/ScheduleDetail.css";
import ScheduleCards from "./CheduleCards";

const ScheduleDetail = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [tabDateIndex, setTabDateIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch schedule data from API
  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        // const response = await fetch("https://api.example.com/schedule"); // Replace with your API endpoint
        // if (!response.ok) {
        //   throw new Error("Failed to fetch schedule data");
        // }
        // const data = await response.json();
        const mockData = [
          { day: "Thứ Tư", date: "22/01/2025" },
          { day: "Thứ Năm", date: "23/01/2025" },
          { day: "Thứ Sáu", date: "24/01/2025" },
          { day: "Thứ Bảy", date: "25/01/2025" },
          { day: "Chủ Nhật", date: "26/01/2025" },
          { day: "Thứ Hai", date: "27/01/2025" },
        ];
        setScheduleData(mockData); // Assuming the API returns an array of { day, date }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, []);

  const changeTabDateIndex = (index) => {
    setTabDateIndex(index);
  }

  if (loading) {
    return <p>Loading schedule...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="sidebar-page-container">
      <div className="auto-container">
        <div className="content-side pd0 col-lg-12 col-md-12 col-sm-12">
          <div className="blog-classic">
            <div className="col-sm-12 pd0">
              {/* Information Box */}
              <div
                className="browse-option-box"
                style={{
                  background: "transparent",
                  padding: "10px",
                  width: "100%",
                  display: "block",
                  marginBottom: "5px",
                  border: "1px solid #fc1b1b",
                }}
              >
                <h3
                  style={{
                    width: "100%",
                    textAlign: "center",
                    color: "#fc1b1b",
                    margin: "0",
                    fontSize: "20px",
                  }}
                >
                  RIO Liên Chiểu Đà Nẵng
                </h3>
                <p
                  style={{
                    width: "100%",
                    textAlign: "center",
                    color: "#22272b",
                    fontSize: "14px",
                  }}
                >
                  0846.272.288
                </p>
                <p
                  style={{
                    width: "100%",
                    textAlign: "center",
                    color: "#22272b",
                    fontSize: "13px",
                  }}
                >
                  403 Tôn Đức Thắng - Phường Hòa Minh - Quận Liên Chiểu - TP. Đà
                  Nẵng
                </p>
              </div>

              {/* Schedule Tabs */}
              <div
                className="tabs movies ui-tabs ui-corner-all ui-widget ui-widget-content"
                id="schedule-tabs"
              >
                <div className="tv-panel-list">
                  <div className="tv-tab">
                    <ul
                      className="nav nav-pills tv-tab-switch schedule-list"
                      id="pills-tab"
                      role="tablist"
                    >
                      {/* Render Schedule Data Dynamically */}
                      {scheduleData.map((tab, index) => (
                        <li className="nav-item" key={index}>
                          <a
                            className={`nav-link ${
                              index === tabDateIndex ? "active show" : ""
                            }`}
                            id={`pills-popular-tab-${index}`}
                            data-toggle="pill"
                            href={`#pills-popular-${index}`}
                            role="tab"
                            aria-controls={`pills-popular-${index}`}
                            aria-selected={index === 0}
                            onClick={() => changeTabDateIndex(index)}
                          >
                            <p
                              style={{
                                width: "100%",
                                textAlign: "center",
                                padding: "0 15px",
                                color: "#f37737",
                                fontWeight: "600",
                              }}
                            >
                              {tab.day}
                            </p>
                            <p
                              style={{
                                width: "100%",
                                textAlign: "center",
                                padding: "5px 15px",
                                color: "#2b2b31",
                                margin: '0px'
                              }}
                            >
                              {tab.date}
                            </p>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ScheduleCards />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleDetail;
