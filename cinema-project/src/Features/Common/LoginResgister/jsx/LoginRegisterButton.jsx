import { useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import "../Content/index.css";

const LoginRegisterButton = () => {
  const [button, setButton] = useState("");
  const isLogin = true;

  return (
    <div className="cart-box">
      <div className="dropdown">
        <button
          className="cart-box-btn dropdown-toggle"
          type="button"
          id="dropdownMenu1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <BiSolidUser />
        </button>
        <ul
          className="dropdown-menu cart-panel"
          aria-labelledby="dropdownMenu1"
        >
          <li>
            <h5>
              <a href="/thong-tin-tai-khoan.html">Kiều Việt Triều</a>
            </h5>
          </li>
          {!isLogin ? (
            <>
              <li>
                <a className="dropdown-item" href="/login">
                  Đăng nhập
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/register">
                  Đăng ký
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a className="dropdown-item" href="/user/profile">
                  Thông tin
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Đăng xuất
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LoginRegisterButton;
