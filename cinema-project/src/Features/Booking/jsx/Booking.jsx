import '../Contents/Booking.css';
import React from 'react';
import SeatSelector from './SeatSelector';

export const Booking = () => {
  const seats = [
    [
      { label: 'A01', row: 'A', index: 1, available: true },
      { label: 'A02', row: 'A', index: 2, available: true },
      { label: 'A03', row: 'A', index: 3, available: true },
      { label: 'A04', row: 'A', index: 4, available: true }, 
      { label: 'A05', row: 'A', index: 5, available: true },
      { label: '', row: 'A', index: 6, available: false },
      { label: 'A06', row: 'A', index: 7, available: true },
      { label: 'A07', row: 'A', index: 8, available: true },
      { label: 'A08', row: 'A', index: 9, available: true },
      { label: 'A09', row: 'A', index: 10, available: true },
      { label: 'A10', row: 'A', index: 11, available: true },
      { label: 'A11', row: 'A', index: 12, available: true },
      { label: 'A12', row: 'A', index: 13, available: true },
      { label: '', row: 'A', index: 14, available: false },
      { label: '', row: 'A', index: 15, available: false },
      { label: '', row: 'A', index: 16, available: false },
      { label: '', row: 'A', index: 17, available: false },
    ],
    [
      { label: 'B01', row: 'B', index: 1, available: true },
      { label: 'B02', row: 'B', index: 2, available: true },
      { label: 'B03', row: 'B', index: 3, available: true },
      { label: 'B04', row: 'B', index: 4, available: true }, 
      { label: 'B05', row: 'B', index: 5, available: true },
      { label: '', row: 'B', index: 6, available: false },
      { label: 'B07', row: 'B', index: 7, available: true },
      { label: 'B08', row: 'B', index: 8, available: true },
      { label: 'B09', row: 'B', index: 9, available: true },
      { label: 'B10', row: 'B', index: 10, available: true },
      { label: 'B11', row: 'B', index: 11, available: true },
      { label: 'B12', row: 'B', index: 12, available: true },
      { label: 'B13', row: 'B', index: 13, available: true },
      { label: '', row: 'B', index: 14, available: false },
      { label: '', row: 'B', index: 15, available: false },
      { label: '', row: 'B', index: 16, available: false },
      { label: '', row: 'B', index: 17, available: false },
    ],
    // Các hàng từ C đến L
    [
      { label: 'C01', row: 'C', index: 1, available: true },
      { label: 'C02', row: 'C', index: 2, available: true },
      { label: 'C03', row: 'C', index: 3, available: true },
      { label: 'C04', row: 'C', index: 4, available: true }, 
      { label: 'C05', row: 'C', index: 5, available: true },
      { label: '', row: 'C', index: 6, available: false },
      { label: 'C06', row: 'C', index: 7, available: true },
      { label: 'C07', row: 'C', index: 8, available: true },
      { label: 'C08', row: 'C', index: 9, available: true },
      { label: 'C09', row: 'C', index: 10, available: true },
      { label: 'C10', row: 'C', index: 11, available: true },
      { label: 'C11', row: 'C', index: 12, available: true },
      { label: 'C12', row: 'C', index: 13, available: true },
      { label: 'C13', row: 'C', index: 14, available: true },
      { label: 'C14', row: 'C', index: 15, available: true },
      { label: '', row: 'C', index: 16, available: false },
      { label: '', row: 'C', index: 17, available: false },
    ],
    [
      { label: 'D01', row: 'D', index: 1, available: true },
      { label: 'D02', row: 'D', index: 2, available: true },
      { label: 'D03', row: 'D', index: 3, available: true },
      { label: 'D04', row: 'D', index: 4, available: true }, 
      { label: 'D05', row: 'D', index: 5, available: true },
      { label: '', row: 'D', index: 6, available: false },
      { label: 'D06', row: 'D', index: 7, available: true },
      { label: 'D07', row: 'D', index: 8, available: true },
      { label: 'D08', row: 'D', index: 9, available: true },
      { label: 'D09', row: 'D', index: 10, available: true },
      { label: 'D10', row: 'D', index: 11, available: true },
      { label: 'D11', row: 'D', index: 12, available: true },
      { label: 'D12', row: 'D', index: 13, available: true },
      { label: 'D13', row: 'D', index: 14, available: true },
      { label: 'D14', row: 'D', index: 15, available: true },
      { label: '', row: 'D', index: 16, available: false },
      { label: '', row: 'D', index: 17, available: false },

    ],
    [
      { label: 'E01', row: 'E', index: 1, available: true },
      { label: 'E02', row: 'E', index: 2, available: true },
      { label: 'E03', row: 'E', index: 3, available: true },
      { label: 'E04', row: 'E', index: 4, available: true }, 
      { label: 'E05', row: 'E', index: 5, available: true },
      { label: '', row: 'E', index: 6, available: false },
      { label: 'E06', row: 'E', index: 7, available: true },
      { label: 'E07', row: 'E', index: 8, available: true },
      { label: 'E08', row: 'E', index: 9, available: true },
      { label: 'E09', row: 'E', index: 10, available: true },
      { label: 'E10', row: 'E', index: 11, available: true },
      { label: 'E11', row: 'E', index: 12, available: true },
      { label: 'E12', row: 'E', index: 13, available: true },
      { label: 'E13', row: 'E', index: 14, available: true },
      { label: 'E14', row: 'E', index: 15, available: true },
      { label: 'E16', row: 'E', index: 16, available: true },
      { label: 'E17', row: 'E', index: 17, available: true },
    ]];
   
  
  return (
    <div>
      {/* <DateCarousel /> */}
      <SeatSelector seats={seats}/>
    </div>
  )
}

