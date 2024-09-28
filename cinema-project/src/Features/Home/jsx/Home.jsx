import React from 'react'
import { Slide } from './Slide'
import { useEffect } from 'react';
import { FilmHome } from './FilmHome';
export function Home(props) {
  const images = [
    'https://cdn.galaxycine.vn/media/2024/8/27/hai-muoi-2048_1724749056215.jpg',
    'https://cdn.galaxycine.vn/media/2024/8/30/hellboy-2024-2_1725020582417.jpg',
    'https://cdn.galaxycine.vn/media/2024/8/26/lam-giau-voi-ma-1_1724686130347.jpg',
    'https://cdn.galaxycine.vn/media/2024/8/30/beetlejuice-beetlejuice-ma-sieu-quay-2048_1724988933786.jpg',
    'https://cdn.galaxycine.vn/media/2024/8/5/pilot-2048_1722847878160.jpg',
  ];

  const movies = [
    {
      id: 1,
      title: "Tên phim 1",
      genre: "Hành động, Phiêu lưu",
      duration: "120 phút",
      releaseDate: "01/09/2024",
      imageUrl: "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202408/11514_103_100003.jpg",
    },
    {
      id: 2,
      title: "Tên phim 2",
      genre: "Kinh dị, Viễn tưởng",
      duration: "105 phút",
      releaseDate: "15/09/2024",
      imageUrl: "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202408/11514_104_100004.jpg",
    },
    {
      id: 3,
      title: "Tên phim 3",
      genre: "Tình cảm, Lãng mạn",
      duration: "110 phút",
      releaseDate: "10/09/2024",
      imageUrl: "https://example.com/movie3.jpg",
    },
    {
      id: 4,
      title: "Tên phim 4",
      genre: "Hài hước, Gia đình",
      duration: "95 phút",
      releaseDate: "20/09/2024",
      imageUrl: "https://example.com/movie4.jpg",
    },
    {
      id: 5,
      title: "Tên phim 5",
      genre: "Hành động, Kinh dị",
      duration: "125 phút",
      releaseDate: "05/09/2024",
      imageUrl: "https://example.com/movie5.jpg",
    },
    {
      id: 6,
      title: "Tên phim 6",
      genre: "Hoạt hình, Phiêu lưu",
      duration: "100 phút",
      releaseDate: "12/09/2024",
      imageUrl: "https://example.com/movie6.jpg",
    },
    {
      id: 7,
      title: "Tên phim 7",
      genre: "Khoa học viễn tưởng, Hành động",
      duration: "140 phút",
      releaseDate: "18/09/2024",
      imageUrl: "https://example.com/movie7.jpg",
    },
    {
      id: 8,
      title: "Tên phim 8",
      genre: "Kinh dị, Siêu nhiên",
      duration: "130 phút",
      releaseDate: "25/09/2024",
      imageUrl: "https://example.com/movie8.jpg",
    },
    {
      id: 9,
      title: "Tên phim 9",
      genre: "Tâm lý, Chính kịch",
      duration: "115 phút",
      releaseDate: "08/09/2024",
      imageUrl: "https://example.com/movie9.jpg",
    },
    {
      id: 10,
      title: "Tên phim 10",
      genre: "Lịch sử, Chiến tranh",
      duration: "150 phút",
      releaseDate: "30/09/2024",
      imageUrl: "https://example.com/movie10.jpg",
    },
    {
      id: 11,
      title: "Tên phim 11",
      genre: "Phiêu lưu, Thần thoại",
      duration: "135 phút",
      releaseDate: "02/10/2024",
      imageUrl: "https://example.com/movie11.jpg",
    },
    {
      id: 12,
      title: "Tên phim 12",
      genre: "Hài hước, Phiêu lưu",
      duration: "90 phút",
      releaseDate: "12/10/2024",
      imageUrl: "https://example.com/movie12.jpg",
    },
    {
      id: 13,
      title: "Tên phim 13",
      genre: "Hành động, Tội phạm",
      duration: "120 phút",
      releaseDate: "15/10/2024",
      imageUrl: "https://example.com/movie13.jpg",
    },
    {
      id: 14,
      title: "Tên phim 14",
      genre: "Kinh dị, Tâm lý",
      duration: "105 phút",
      releaseDate: "18/10/2024",
      imageUrl: "https://example.com/movie14.jpg",
    },
    {
      id: 15,
      title: "Tên phim 15",
      genre: "Thể thao, Tâm lý",
      duration: "115 phút",
      releaseDate: "25/10/2024",
      imageUrl: "https://example.com/movie15.jpg",
    },
    {
      id: 16,
      title: "Tên phim 16",
      genre: "Hành động, Phiêu lưu",
      duration: "110 phút",
      releaseDate: "30/10/2024",
      imageUrl: "https://example.com/movie16.jpg",
    },
    {
      id: 17,
      title: "Tên phim 17",
      genre: "Khoa học viễn tưởng, Phiêu lưu",
      duration: "125 phút",
      releaseDate: "01/11/2024",
      imageUrl: "https://example.com/movie17.jpg",
    },
    {
      id: 18,
      title: "Tên phim 18",
      genre: "Hoạt hình, Gia đình",
      duration: "95 phút",
      releaseDate: "10/11/2024",
      imageUrl: "https://example.com/movie18.jpg",
    },
    {
      id: 19,
      title: "Tên phim 19",
      genre: "Kinh dị, Hành động",
      duration: "130 phút",
      releaseDate: "15/11/2024",
      imageUrl: "https://example.com/movie19.jpg",
    },
    {
      id: 20,
      title: "Tên phim 20",
      genre: "Tâm lý, Chính kịch",
      duration: "120 phút",
      releaseDate: "20/11/2024",
      imageUrl: "https://example.com/movie20.jpg",
    },
  ];
  
  const moviesForYou = {
    title: "Dành cho bạn",
    data: movies.slice(0, 6),
  }

  const showingMovies = {
    title: "Phim đang chiếu",
    data: movies.slice(5, 13),
  }

  const upcomingMovies = {
    title: "Phim sắp chiếu",
    data: movies.slice(10, 20),
  }

  useEffect(() => {
    if (window.someLibrary) {
      window.someLibrary.init();
    } else {
      console.error('someLibrary is not defined on the window object');
    }
  }, []);

    
  return (
    <>
      <Slide images={images}/>
      <div className='pd-main'>
        <div>
          <FilmHome moviesForYou={moviesForYou} showingMovies={showingMovies} upcomingMovies={upcomingMovies}/>
        </div>
        <div></div>
        <div></div>
      </div>
    </>
  )
}