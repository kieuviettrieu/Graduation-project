import '../Contents/Booking.css';
import React from 'react';
import SeatList from './SeatList';
import DateCarousel from './DateSlider';

export const Booking = () => {
  return (
    <div>
      <DateCarousel />
      <SeatList />
    </div>
  )
}

