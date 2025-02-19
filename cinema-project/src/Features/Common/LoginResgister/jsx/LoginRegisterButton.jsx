import { useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import "../Content/index.css";
import { logout } from "../../../axios/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../../../Redux/Actions";

const LoginRegisterButton = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [button, setButton] = useState("");
  const isLogin = user ? true : false;

  const handleLogout = () => {
    dispatch(logoutAction());
    logout();
  }

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
          <li style={{width: "100%"}}>
            <h5>
              {user?.username || ""}
            </h5>
          </li>
          {!isLogin ? (
            <>
              <li>
                <a className="dropdown-item" href="/register">
                  Đăng ký
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/login">
                  Đăng nhập
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
                <a className="dropdown-item" href="/login" onClick={() => handleLogout()}>
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
