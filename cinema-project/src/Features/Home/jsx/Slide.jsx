import React from 'react'
import { Carousel } from 'antd';
import '../Contents/Slide.css'

export function Slide(props) {
    
  return (
    <div className='slide'>
      <Carousel arrows autoplay>
        {props.images.map(item => {
          return <div>
            <img  src={item} className='slide-image' alt="..."></img>
          </div>
        })}
      </Carousel>
    </div>
  )
}