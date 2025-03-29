import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import '../Content/Corner.css'; 
import { ROUTER_PATHS } from '../../Common/Constant';

const Corner = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className='auto-container'>
      <div className="corner-container">
        <div className="content-side">
          <div className="list-sidebar">
            <ul className="left-widget-tag">
              <li><a href="#" className="active">RẠP CHIẾU PHIM</a></li>
              <li><a href="#">TRỰC TUYẾN</a></li>
              <li><a href="#">BẢNG GIÁ VÉ</a></li>
              <li><a href="#">BẢNG GIÁ BẮP NƯỚC</a></li>
            </ul>
          </div>
        </div>

        {/* Sidebar Side */}
        <div className="sidebar-side">
          <aside className="sidebar">
            <div className="accordion">
              {/* Age Classification Card */}
              <div className="card">
                <div className="card-header">
                  <h2 className="mb-0">
                    <button 
                      className={`btn btn-link ${activeAccordion === 3 ? '' : 'collapsed'}`} 
                      type="button" 
                      onClick={() => toggleAccordion(3)}
                    >
                      <FaPlus className="accordion-icon" /> PHÂN LOẠI ĐỘ TUỔI XEM PHIM
                    </button>
                  </h2>
                </div>

                <div 
                  className={`collapse ${activeAccordion === 3 ? 'show' : ''}`}
                >
                  <div className="card-body">
                    <p className="cinema-text">
                      <span className="cinema-text-bold">
                        Căn cứ Thông tư số 12/2015/TT-BVHTTDL của Bộ trưởng Bộ Văn hóa, Thể thao và Du lịch có hiệu lực thi hành từ ngày 01/01/2017, Tiêu chí phân loại phim theo lứa tuổi được quy định như sau:
                      </span>
                    </p>
                    <div className="spacer" />
                    
                    <p className="cinema-text">
                      <span className="cinema-text-bold">P:</span> Phim được phép phổ biến rộng rãi đến mọi đối tượng
                    </p>
                    
                    <p className="cinema-text">
                      <span className="cinema-text-bold">K:</span> Phim được phép phổ biến rộng rãi đến mọi đối tượng. Đối tượng dưới 13 tuổi phải có người bảo hộ đi cùng
                    </p>
                    <div className="spacer" />
                    
                    <p className="cinema-text">
                      <span className="cinema-text-bold">C13:</span> Phim cấm phổ biến đến khán giả dưới 13 tuổi
                    </p>
                    <div className="spacer" />
                    
                    <p className="cinema-text">
                      <span className="cinema-text-bold">C16:</span> Phim cấm phổ biến đến khán giả dưới 16 tuổi
                    </p>
                    <div className="spacer" />
                    
                    <p className="cinema-text">
                      <span className="cinema-text-bold">C18:</span> Phim cấm phổ biến đến khán giả dưới 18 tuổi
                    </p>
                    <div className="spacer" />
                    
                    <p className="cinema-text">
                      <span className="cinema-text-bold">Khách hàng vui lòng chứng thực độ tuổi của mình</span> phù hợp với điều kiện phân loại của phim mà quý khách đã lựa chọn xem. ICA Cinemas có quyền từ chối bán vé cũng như vào phòng chiếu và không hoàn trả lại tiền vé khi khách hàng không tuân thủ theo quy định đã được ban hành.
                    </p>
                  </div>
                </div>
              </div>

              {/* Movie Schedule Card */}
              <div className="card">
                <div className="card-header">
                  <h2 className="mb-0">
                    <button 
                      className={`btn btn-link ${activeAccordion === 4 ? '' : 'collapsed'}`} 
                      type="button" 
                      onClick={() => toggleAccordion(4)}
                    >
                      <FaPlus className="accordion-icon" /> LỊCH CHIẾU PHIM TẠI ICA CINEMAS
                    </button>
                  </h2>
                </div>

                <div 
                  className={`collapse ${activeAccordion === 4 ? 'show' : ''}`}
                >
                  <div className="card-body">
                    <p className="cinema-text">
                      Quý khách vui lòng truy cập vào Website: <a href={ROUTER_PATHS.FILM_SCHEDULE} className="cinema-link">Lịch Chiếu</a> hoặc App <a href={ROUTER_PATHS.FILM_SCHEDULE} className="cinema-link">ICA Cinemas</a> để xem lịch chiếu nhé
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h2 className="mb-0">
                    <button 
                      className={`btn btn-link ${activeAccordion === 5 ? '' : 'collapsed'}`} 
                      type="button" 
                      onClick={() => toggleAccordion(5)}
                    >
                      <FaPlus className="accordion-icon" /> QUY ĐỊNH XEM PHIM TẠI ICA CINEMAS
                    </button>
                  </h2>
                </div>

                <div 
                  className={`collapse ${activeAccordion === 5 ? 'show' : ''}`}
                >
                  <div className="card-body">
                    <p className="cinema-text">
                      Để đảm bảo việc phục vụ quý khách được thuận tiện nhất, kính mong quý khách hợp tác và tuân thủ các quy định khi xem phim trong rạp như sau:
                    </p>
                    <div className="spacer" />
                    
                    <ol className="regulation-list">
                      <li>Ngồi đúng vị trí in trên vé.</li>
                      <li>Giữ cuống vé trong suốt thời gian chiếu phim để kiểm tra lại khi cần.</li>
                      <li>Tắt điện thoại hoặc chuyển sang chế độ rung để không làm phiền khách hàng khác.</li>
                      <li>Tự bảo quản tư trang và tiền bạc cá nhân.</li>
                      <li>Không hút thuốc và giữ trật tự chung.</li>
                      <li>Không chụp hình và quay phim trong rạp.</li>
                      <li>Chỉ mang đồ ăn, thức uống được bán tại quầy của ICA Cinemas vào phòng chiếu.</li>
                      <li>Bảo quản kính 3D cẩn thận và giao lại cho nhân viên khi kết thúc phim.</li>
                    </ol>
                    
                    <div className="spacer" />
                    <p className="cinema-text">
                      Một lần nữa, xin chân thành cảm ơn sự hợp tác của quý khách và kính chúc quý khách xem phim vui vẻ tại ICA Cinemas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Corner;