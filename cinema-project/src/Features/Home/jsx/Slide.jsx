import React from 'react'
import { Carousel } from 'antd';
import '../Contents/Slide.css'

export function Slide(props) {
    
  return (
    <div className='slide'>
      <div className='slide-title'> 
        <a href="#" className='site slide-title-text'>PHIM HOT TẠI RẠP</a>
      </div>
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