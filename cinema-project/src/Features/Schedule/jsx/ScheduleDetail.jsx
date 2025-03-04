import React, { useState, useEffect } from "react";
import "../Contents/ScheduleDetail.css";
import ScheduleCards from "./CheduleCards";
import { callAPI } from "../../axios/axiosInstance";
import { API_CINEMA } from "../../Admin/ManageCinema/jsx/Constant";
import { useParams } from "react-router-dom";
import { generateWeekDates } from "../../Common/Constant";
import { useLoading } from "../../../LoadingProvider";

const ScheduleDetail = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [cinemaData, setCinemaData] = useState([]);
  const [date, setDate] = useState(null);
  const [tabDateIndex, setTabDateIndex] = useState(0);
  const [error, setError] = useState(null);
  const { scheduleId } = useParams();
  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchScheduleData = async () => {
      setLoading(true);
      try {
        const cinema = await callAPI(
          "get",
          `${API_CINEMA.getCinemaById}/${scheduleId}`
        );
        setCinemaData(cinema);
        const mockData = generateWeekDates();
        setDate(mockData[0]);
        setScheduleData(mockData); // Assuming the API returns an array of { day, date }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, []);

  const changeTabDateIndex = (date, index) => {
    setDate(date);
    setTabDateIndex(index);
  };


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
                  {cinemaData?.name}
                </h3>
                <p
                  style={{
                    width: "100%",
                    textAlign: "center",
                    color: "#22272b",
                    fontSize: "14px",
                  }}
                >
                  {cinemaData?.phoneNumber}
                </p>
                <p
                  style={{
                    width: "100%",
                    textAlign: "center",
                    color: "#22272b",
                    fontSize: "13px",
                  }}
                >
                  {cinemaData?.address}
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
                            onClick={() => changeTabDateIndex(tab, index)}
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
                                margin: "0px",
                              }}
                            >
                              {tab.date}
                            </p>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ScheduleCards cinemaId={cinemaData?.id} date={date} />
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
