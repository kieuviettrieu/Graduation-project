import '../Contents/Booking.css';
import React from 'react';
import SeatSelector from './SeatSelector';
import { useParams } from "react-router-dom";

export const Booking = () => {
  const { timeId } = useParams();
   
  
  return (
    <div>
      {/* <DateCarousel /> */}
      <SeatSelector showTimeId={timeId}/>
    </div>
  )
}

