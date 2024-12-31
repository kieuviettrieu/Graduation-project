import React from "react";
import CinemaCard from "./Card";

const cinemaData = [
    {
      id: 1,
      name: "RIO Liên Chiểu Đà Nẵng",
      address: "403 Tôn Đức Thắng - Phường Hòa Minh - Quận Liên Chiểu - TP. Đà Nẵng",
      phone: "0846.272.288",
      imgUrl: "http://www.riocinemas.vn/Areas/Admin/Content/Fileuploads/images/H%C3%ACnh%20%E1%BA%A3nh%20l%E1%BB%8Bch%20chi%E1%BA%BFu%20r%E1%BA%A1p/Final-03.jpg",
      link: "/lich-chieu/rio-lien-chieu-da-nang-3.html",
    },
    {
      id: 2,
      name: "RIO Hội An",
      address: "100 Lý Thường Kiệt - Phường Minh An - Hội An",
      phone: "0846.273.399",
      imgUrl: "http://www.riocinemas.vn/Areas/Admin/Content/Fileuploads/images/H%C3%ACnh%20%E1%BA%A3nh%20l%E1%BB%8Bch%20chi%E1%BA%BFu%20r%E1%BA%A1p/Final-03.jpg",
      link: "/lich-chieu/rio-hoi-an.html",
    },
    {
      id: 3,
      name: "RIO Hải Châu",
      address: "200 Bạch Đằng - Hải Châu - Đà Nẵng",
      phone: "0846.274.400",
      imgUrl: "http://www.riocinemas.vn/Areas/Admin/Content/Fileuploads/images/H%C3%ACnh%20%E1%BA%A3nh%20l%E1%BB%8Bch%20chi%E1%BA%BFu%20r%E1%BA%A1p/Final-03.jpg",
      link: "/lich-chieu/rio-hai-chau.html",
    },
    {
      id: 4,
      name: "RIO Thanh Khê",
      address: "150 Nguyễn Văn Linh - Thanh Khê - Đà Nẵng",
      phone: "0846.275.500",
      imgUrl: "http://www.riocinemas.vn/Areas/Admin/Content/Fileuploads/images/H%C3%ACnh%20%E1%BA%A3nh%20l%E1%BB%8Bch%20chi%E1%BA%BFu%20r%E1%BA%A1p/Final-03.jpg",
      link: "/lich-chieu/rio-thanh-khe.html",
    },
    {
      id: 5,
      name: "RIO Sơn Trà",
      address: "99 Võ Văn Kiệt - Sơn Trà - Đà Nẵng",
      phone: "0846.276.600",
      imgUrl: "http://www.riocinemas.vn/Areas/Admin/Content/Fileuploads/images/H%C3%ACnh%20%E1%BA%A3nh%20l%E1%BB%8Bch%20chi%E1%BA%BFu%20r%E1%BA%A1p/Final-03.jpg",
      link: "/lich-chieu/rio-son-tra.html",
    },
    {
      id: 6,
      name: "RIO Ngũ Hành Sơn",
      address: "88 Ngũ Hành Sơn - Đà Nẵng",
      phone: "0846.277.700",
      imgUrl: "http://www.riocinemas.vn/Areas/Admin/Content/Fileuploads/images/H%C3%ACnh%20%E1%BA%A3nh%20l%E1%BB%8Bch%20chi%E1%BA%BFu%20r%E1%BA%A1p/Final-03.jpg",
      link: "/lich-chieu/rio-ngu-hanh-son.html",
    },
    {
      id: 7,
      name: "RIO Huế",
      address: "50 Hùng Vương - Thành Phố Huế",
      phone: "0846.278.800",
      imgUrl: "http://www.riocinemas.vn/Areas/Admin/Content/Fileuploads/images/H%C3%ACnh%20%E1%BA%A3nh%20l%E1%BB%8Bch%20chi%E1%BA%BFu%20r%E1%BA%A1p/Final-03.jpg",
      link: "/lich-chieu/rio-hue.html",
    },
    {
      id: 8,
      name: "RIO Quảng Nam",
      address: "75 Trần Hưng Đạo - Tam Kỳ - Quảng Nam",
      phone: "0846.279.900",
      imgUrl: "http://www.riocinemas.vn/Areas/Admin/Content/Fileuploads/images/H%C3%ACnh%20%E1%BA%A3nh%20l%E1%BB%8Bch%20chi%E1%BA%BFu%20r%E1%BA%A1p/Final-03.jpg",
      link: "/lich-chieu/rio-quang-nam.html",
    },
    {
      id: 9,
      name: "RIO Quảng Ngãi",
      address: "25 Phan Bội Châu - Quảng Ngãi",
      phone: "0846.280.000",
      imgUrl: "http://www.riocinemas.vn/Areas/Admin/Content/Fileuploads/images/H%C3%ACnh%20%E1%BA%A3nh%20l%E1%BB%8Bch%20chi%E1%BA%BFu%20r%E1%BA%A1p/Final-03.jpg",
      link: "/lich-chieu/rio-quang-ngai.html",
    },
    {
      id: 10,
      name: "RIO Quy Nhơn",
      address: "60 Lê Hồng Phong - Quy Nhơn - Bình Định",
      phone: "0846.281.111",
      imgUrl: "http://www.riocinemas.vn/Areas/Admin/Content/Fileuploads/images/H%C3%ACnh%20%E1%BA%A3nh%20l%E1%BB%8Bch%20chi%E1%BA%BFu%20r%E1%BA%A1p/Final-03.jpg",
      link: "/lich-chieu/rio-quy-nhon.html",
    },
];
    

const CinemaList = () => {
  return (
    <div className="row">
      {cinemaData.map((cinema) => (
        <CinemaCard
          key={cinema.id}
          name={cinema.name}
          address={cinema.address}
          phone={cinema.phone}
          imgUrl={cinema.imgUrl}
          link={cinema.link}
        />
      ))}
    </div>
  );
};

export default CinemaList;
