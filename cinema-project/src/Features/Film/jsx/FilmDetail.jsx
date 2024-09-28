import React from 'react'
import { Carousel } from 'antd';
import { useParams } from 'react-router-dom';
import '../Contents/Film.css'

export function FilmDetail(props) {
  const { filmId } = useParams()
    
  return (
    <div>
      Detail : {filmId}
    </div>
    // <div className='slide'>
    //   <div className='slide-title'> 
    //     <a href="#" className='site slide-title-text'>PHIM HOT TẠI RẠP</a>
    //   </div>
    //   <Carousel arrows autoplay>
    //     {props.images.map(item => {
    //       return <div>
    //         <img  src={item} className='slide-image' alt="..."></img>
    //       </div>
    //     })}
    //   </Carousel>
    // </div>
  )
}