import { Breadcrumb, Flex } from "antd";

import React, { useState } from 'react';
import '../Contents/SeatList.css';

const seatsData = [
    // Dãy A
    { id: 1, loaighe: 'VIP', hang: 'A', phong_chieu: '1', trangthai: 'available' },
    { id: 2, loaighe: 'VIP', hang: 'A', phong_chieu: '1', trangthai: 'occupied' },
    { id: 3, loaighe: 'Thường', hang: 'A', phong_chieu: '1', trangthai: 'available' },
    { id: 4, loaighe: 'Thường', hang: 'A', phong_chieu: '1', trangthai: 'available' },
    { id: 5, loaighe: 'VIP', hang: 'A', phong_chieu: '1', trangthai: 'occupied' },
    { id: 6, loaighe: 'Thường', hang: 'A', phong_chieu: '1', trangthai: 'available' },
    { id: 7, loaighe: 'Thường', hang: 'A', phong_chieu: '1', trangthai: 'available' },
  
    // Dãy B
    { id: 8, loaighe: 'VIP', hang: 'B', phong_chieu: '1', trangthai: 'available' },
    { id: 9, loaighe: 'VIP', hang: 'B', phong_chieu: '1', trangthai: 'available' },
    { id: 10, loaighe: 'Thường', hang: 'B', phong_chieu: '1', trangthai: 'available' },
    { id: 11, loaighe: 'Thường', hang: 'B', phong_chieu: '1', trangthai: 'occupied' },
    { id: 12, loaighe: 'Thường', hang: 'B', phong_chieu: '1', trangthai: 'available' },
    { id: 13, loaighe: 'VIP', hang: 'B', phong_chieu: '1', trangthai: 'occupied' },
    { id: 14, loaighe: 'Thường', hang: 'B', phong_chieu: '1', trangthai: 'available' },
  
    // Dãy C
    { id: 15, loaighe: 'VIP', hang: 'C', phong_chieu: '1', trangthai: 'available' },
    { id: 16, loaighe: 'Thường', hang: 'C', phong_chieu: '1', trangthai: 'available' },
    { id: 17, loaighe: 'Thường', hang: 'C', phong_chieu: '1', trangthai: 'available' },
    { id: 18, loaighe: 'VIP', hang: 'C', phong_chieu: '1', trangthai: 'occupied' },
    { id: 19, loaighe: 'Thường', hang: 'C', phong_chieu: '1', trangthai: 'available' },
    { id: 20, loaighe: 'Thường', hang: 'C', phong_chieu: '1', trangthai: 'occupied' },
    { id: 21, loaighe: 'VIP', hang: 'C', phong_chieu: '1', trangthai: 'available' },
  
    // Dãy D
    { id: 22, loaighe: 'Thường', hang: 'D', phong_chieu: '1', trangthai: 'available' },
    { id: 23, loaighe: 'VIP', hang: 'D', phong_chieu: '1', trangthai: 'available' },
    { id: 24, loaighe: 'VIP', hang: 'D', phong_chieu: '1', trangthai: 'available' },
    { id: 25, loaighe: 'Thường', hang: 'D', phong_chieu: '1', trangthai: 'occupied' },
    { id: 26, loaighe: 'VIP', hang: 'D', phong_chieu: '1', trangthai: 'occupied' },
    { id: 27, loaighe: 'Thường', hang: 'D', phong_chieu: '1', trangthai: 'available' },
    { id: 28, loaighe: 'Thường', hang: 'D', phong_chieu: '1', trangthai: 'available' },
  
    // Dãy E
    { id: 29, loaighe: 'VIP', hang: 'E', phong_chieu: '1', trangthai: 'available' },
    { id: 30, loaighe: 'Thường', hang: 'E', phong_chieu: '1', trangthai: 'occupied' },
    { id: 31, loaighe: 'Thường', hang: 'E', phong_chieu: '1', trangthai: 'available' },
    { id: 32, loaighe: 'VIP', hang: 'E', phong_chieu: '1', trangthai: 'available' },
    { id: 33, loaighe: 'Thường', hang: 'E', phong_chieu: '1', trangthai: 'available' },
    { id: 34, loaighe: 'Thường', hang: 'E', phong_chieu: '1', trangthai: 'occupied' },
    { id: 35, loaighe: 'VIP', hang: 'E', phong_chieu: '1', trangthai: 'available' },
  
    // Dãy F
    { id: 36, loaighe: 'VIP', hang: 'F', phong_chieu: '1', trangthai: 'available' },
    { id: 37, loaighe: 'Thường', hang: 'F', phong_chieu: '1', trangthai: 'available' },
    { id: 38, loaighe: 'VIP', hang: 'F', phong_chieu: '1', trangthai: 'occupied' },
    { id: 39, loaighe: 'Thường', hang: 'F', phong_chieu: '1', trangthai: 'available' },
    { id: 40, loaighe: 'Thường', hang: 'F', phong_chieu: '1', trangthai: 'available' },
    { id: 41, loaighe: 'VIP', hang: 'F', phong_chieu: '1', trangthai: 'available' },
    { id: 42, loaighe: 'Thường', hang: 'F', phong_chieu: '1', trangthai: 'occupied' },
  
    // Dãy G
    { id: 43, loaighe: 'Thường', hang: 'G', phong_chieu: '1', trangthai: 'available' },
    { id: 44, loaighe: 'Thường', hang: 'G', phong_chieu: '1', trangthai: 'occupied' },
    { id: 45, loaighe: 'VIP', hang: 'G', phong_chieu: '1', trangthai: 'available' },
    { id: 46, loaighe: 'Thường', hang: 'G', phong_chieu: '1', trangthai: 'available' },
    { id: 47, loaighe: 'Thường', hang: 'G', phong_chieu: '1', trangthai: 'available' },
    { id: 48, loaighe: 'VIP', hang: 'G', phong_chieu: '1', trangthai: 'available' },
    { id: 49, loaighe: 'Thường', hang: 'G', phong_chieu: '1', trangthai: 'available' },
  
    // Dãy H
    { id: 50, loaighe: 'VIP', hang: 'H', phong_chieu: '1', trangthai: 'occupied' },
    { id: 51, loaighe: 'Thường', hang: 'H', phong_chieu: '1', trangthai: 'available' },
    { id: 52, loaighe: 'VIP', hang: 'H', phong_chieu: '1', trangthai: 'available' },
    { id: 53, loaighe: 'Thường', hang: 'H', phong_chieu: '1', trangthai: 'available' },
    { id: 54, loaighe: 'VIP', hang: 'H', phong_chieu: '1', trangthai: 'available' },
    { id: 55, loaighe: 'Thường', hang: 'H', phong_chieu: '1', trangthai: 'occupied' },
    { id: 56, loaighe: 'Thường', hang: 'H', phong_chieu: '1', trangthai: 'available' }
  ];
  

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const seatsPerRow = 7;

const SeatList = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Xử lý chọn ghế
    const toggleSeat = (seat) => {
      if (seat.trangthai !== 'available') return; // Chỉ có thể chọn ghế available
      if (selectedSeats.includes(seat.id)) {
        setSelectedSeats(selectedSeats.filter(s => s !== seat.id));
      } else {
        setSelectedSeats([...selectedSeats, seat.id]);
      }
    };
  
    // Lấy danh sách ghế theo dãy
    const getSeatsForRow = (row) => {
      return seatsData.filter(seat => seat.hang === row);
    };
  
    return (
      <div className="container">
        <h1>Chọn Ghế Ngồi</h1>
        <div className="screen">Màn hình</div>
  
        {/* Hiển thị các dãy ghế */}
        <div className="seating">
          {rows.map((row) => (
            <div className="row" key={row}>
              {getSeatsForRow(row).map((seat) => (
                <div
                  key={seat.id}
                  className={`seat ${seat.trangthai} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                  onClick={() => toggleSeat(seat)}
                >
                  {seat.hang}{seat.id}
                </div>
              ))}
            </div>
          ))}
        </div>
  
        {/* Hiển thị các ghế đã chọn */}
        <div className="selected-seats">
          <h2>Ghế đã chọn:</h2>
          {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Chưa có ghế nào'}
        </div>
      </div>
    );
  };
  

export default SeatList;

// const SeatList = () => {
//   const [checked, setChecked] = useState([]);
//   const [seatCode, setSeatCode] = useState([]);
//   const location = useLocation();
//   const [seats, setSeats] = useState([]);
//   const navigate = useNavigate();
//   const [locationState, setLocationState] = useState({ data: [], tenphim: "" });
//   React.useEffect(() => {
//     if (location.state) {
//       let _state = location.state;
//       setLocationState(_state);
//       console.log(_state);
//       console.log(_state.data.ghe);
//       console.log(checked);
//     }
//   }, []);
//   useEffect(() => {
//     console.log(checked);
//   }, [checked]);

//   useEffect(() => {
//     console.log(seatCode);
//   }, [seatCode]);

//   useEffect(() => {
//     setSeats(
//       location.state.data.ghe.map((item) => {
//         return {
//           id: item.id,
//           suatchieu_ID: item.suatchieu_ID,
//           ma_ghe: item.ma_ghe,
//           color: "gray",
//         };
//       })
//     );
//   }, []);

//   const List = seats.map((item) => {
//     return item.suatchieu_ID.includes(location.state.data.id) ? (
//       <Box
//         bgColor="red.400"
//         borderTopLeftRadius="50%"
//         borderTopRightRadius="50%"
//         w="35px"
//         h="30px"
//         key={item.id}
//         display="flex"
//         userSelect={"none"}
//         cursor="not-allowed"
//         justifyContent={"center"}
//         alignItems="center"
//       >
//         {item.ma_ghe}
//       </Box>
//     ) : (
//       <Box
//         key={item.id}
//         bgColor={item.color}
//         borderTopLeftRadius="50%"
//         borderTopRightRadius="50%"
//         display="flex"
//         justifyContent={"center"}
//         alignItems="center"
//         cursor="pointer"
//         w="35px"
//         h="30px"
//       >
//         <input
//           style={{
//             width: "32px",
//             cursor: "pointer",
//             position: "absolute",
//             height: "30px",
//             opacity: "0",
//           }}
//           value={item.id}
//           type="checkbox"
//           onChange={(e) => {
//             var updateList = [...checked];
//             var updateList2 = [...seatCode];
//             if (e.target.checked) {
//               updateList = [...checked, e.target.value];
//               updateList2 = [...seatCode, item.ma_ghe];
//               setSeats((prevState) => {
//                 return prevState.map((prev) => {
//                   if (prev.id === item.id) {
//                     prev.color = "green.400";
//                   }
//                   return prev;
//                 });
//               });
//             } else {
//               updateList.splice(checked.indexOf(e.target.value), 1);
//               updateList2.splice(seatCode.indexOf(item.ma_ghe), 1);
//               setSeats((prevState) => {
//                 return prevState.map((prev) => {
//                   if (prev.id === item.id) {
//                     prev.color = "gray";
//                   }
//                   return prev;
//                 });
//               });
//             }
//             setSeatCode(updateList2);
//             setChecked(updateList);
//           }}
//         />
//         {item.ma_ghe}
//       </Box>
//     );
//   });

//   return (
//     <Box>
//       <Stack
//         minH="640px"
//         color="white"
//         bgColor="#1F1D36"
//         px={164}
//         py={18}
//         fontFamily="Poppins"
//       >
//         <Box>
//           <Heading fontSize="32px">Thông tin phim</Heading>
//           <Divider size="" mb="24px" />
//           <Breadcrumb
//             spacing="8px"
//             separator={
//               <Heading>
//                 <ChevronRightIcon />
//               </Heading>
//             }
//           >
//             <BreadcrumbItem>
//               <BreadcrumbLink href="#">
//                 <Heading fontSize="32px">{locationState.tenphim}</Heading>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbItem>
//               <BreadcrumbLink href="#">
//                 <Heading fontSize="32px">MUA VÉ</Heading>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbItem>
//               <BreadcrumbLink href="#">
//                 <Heading fontSize="32px">CHỌN LỊCH CHIẾU</Heading>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbItem isCurrentPage>
//               <BreadcrumbLink href="#">
//                 <Heading fontSize="32px">CHỌN GHẾ</Heading>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//           </Breadcrumb>
//           <Box>
//             <Divider mt="10px" mb="24px" />
//             <Flex>
//               <Stack spacing="24px">
//                 <Center borderRadius="10px" border="4px" w="255px" p="10px">
//                   <Center>
//                     <Box>
//                       <Heading textAlign="center" fontSize="36px">
//                         {location.state.data.phongchieu_name}
//                       </Heading>
//                     </Box>
//                   </Center>
//                 </Center>
//                 <Center borderRadius="10px" border="4px" w="255px" p="15px">
//                   <Center>
//                     <Box>
//                       <Heading textAlign="center" fontSize="36px">
//                         {moment(location.state.data.ngay_chieu).format(
//                           "ddd DD/MM/YYYY"
//                         )}
//                       </Heading>
//                     </Box>
//                   </Center>
//                 </Center>
//                 <Center
//                   borderRadius="10px"
//                   border="4px"
//                   w="255px"
//                   h="62"
//                   p="10px"
//                 >
//                   <Flex>
//                     <Box>
//                       <Heading fontSize="22px" textAlign="center">
//                         {moment(
//                           location.state.data.gio_bat_dau,
//                           "h:mm:ss"
//                         ).format("LT")}{" "}
//                         -{" "}
//                         {moment(
//                           location.state.data.gio_ket_thuc,
//                           "h:mm:ss"
//                         ).format("LT")}
//                       </Heading>
//                     </Box>
//                   </Flex>
//                 </Center>

//                 <Center borderRadius="10px" border="4px" w="255px">
//                   <Box w="100%">
//                     <Heading fontSize="25px" textAlign="center" m="5px">
//                       Ghế đang chọn
//                     </Heading>
//                     <hr />
//                     <hr />
//                     <hr />
//                     <Heading fontSize="20px" m="8px" textAlign="center">
//                       {seatCode.length === 0
//                         ? "Không có ghế được chọn"
//                         : seatCode.map((i) => i).join(", ")}
//                     </Heading>
//                   </Box>
//                 </Center>
//                 <Center mt="60px">
//                   <Button
//                     colorScheme="red"
//                     color="white"
//                     size="lg"
//                     borderRadius="8px"
//                     w="80px"
//                     h="40px"
//                     mr="50px"
//                     onClick={() => navigate(-1)}
//                   >
//                     Back
//                   </Button>
//                   {checked.length === 0 ? (
//                     <Button
//                       disabled
//                       colorScheme="blue"
//                       color="white"
//                       size="lg"
//                       borderRadius="8px"
//                       w="80px"
//                       h="40px"
//                     >
//                       Next
//                     </Button>
//                   ) : (
//                     <Link
//                       to="/home/movie-info/lich-chieu/chon-ghe/chon-food-drink"
//                       state={{
//                         data: location.state,
//                         ghe: checked,
//                         seatCode: seatCode,
//                       }}
//                     >
//                       <Button
//                         colorScheme="blue"
//                         color="white"
//                         size="lg"
//                         borderRadius="8px"
//                         w="80px"
//                         h="40px"
//                       >
//                         Next
//                       </Button>
//                     </Link>
//                   )}
//                 </Center>
//               </Stack>
//               <Spacer />
//               <Box borderRadius="10px" w="75%" border={"4px"}>
//                 <Text fontSize="30px" textAlign="center">
//                   Người/ Ghế
//                 </Text>
//                 <hr />
//                 <hr />
//                 <hr />
//                 <Center mt="20px">
//                   <Box>
//                     <div className="Cinema">
//                       <div className="screen" />
//                     </div>
//                     <SimpleGrid
//                       columns={[2, null, location.state.data.soluong_cot]}
//                       spacing="10px"
//                     >
//                       {List}
//                     </SimpleGrid>
//                   </Box>
//                 </Center>
//                 <Center mt="30px" mb="20px">
//                   <Flex alignItems="center">
//                     <Box
//                       bgColor="gray"
//                       borderTopLeftRadius="50%"
//                       borderTopRightRadius="50%"
//                       w="30px"
//                       h="25px"
//                     ></Box>
//                     <Text ml="10px" fontSize="17px">
//                       Trống
//                     </Text>
//                   </Flex>
//                   <Flex alignItems="center" ml="50px" mr="50px">
//                     <Box
//                       bgColor="green.400"
//                       borderTopLeftRadius="50%"
//                       borderTopRightRadius="50%"
//                       w="30px"
//                       h="25px"
//                     ></Box>
//                     <Text ml="10px" fontSize="17px">
//                       Đang chọn
//                     </Text>
//                   </Flex>
//                   <Flex alignItems="center">
//                     <Box
//                       bgColor="red.400"
//                       borderTopLeftRadius="50%"
//                       borderTopRightRadius="50%"
//                       w="30px"
//                       h="25px"
//                     ></Box>
//                     <Text ml="10px" fontSize="17px">
//                       Đã chọn
//                     </Text>
//                   </Flex>
//                 </Center>
//               </Box>
//             </Flex>
//           </Box>
//         </Box>
//       </Stack>
//     </Box>
//   );
// };

// export default SeatList;
