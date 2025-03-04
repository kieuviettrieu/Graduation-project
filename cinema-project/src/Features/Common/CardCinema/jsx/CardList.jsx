import React, { useEffect, useState } from "react";
import CinemaCard from "./Card";
import { generateUrl, ROUTER_PATHS } from "../../Constant";
import { useLoading } from "../../../../LoadingProvider";
import { callAPI } from "../../../axios/axiosInstance";
import { API_CINEMA } from "../../../Admin/ManageCinema/jsx/Constant";

const CinemaList = () => {
   const [cinemasReal, setCinemasReal] = useState([]);
   const { setLoading } = useLoading();
  
    useEffect(() => {
      const fetchMovies = async () => {
        try {
          setLoading(true);
          const data = await callAPI("get", API_CINEMA.scheduleCinema);
          setCinemasReal(data?.content); 
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchMovies();
    }, []);
  return (
    <div className="row">
      {cinemasReal?.map((cinema) => (
        <CinemaCard
          key={cinema.id}
          name={cinema.name}
          address={cinema.address}
          phone={cinema.phoneNumber}
          image={cinema.image}
          link={generateUrl(ROUTER_PATHS.FILM_SCHEDULE_DETAIL, {
            scheduleId: cinema?.id,
          })}
        />
      ))}
    </div>
  );
};

export default CinemaList;
