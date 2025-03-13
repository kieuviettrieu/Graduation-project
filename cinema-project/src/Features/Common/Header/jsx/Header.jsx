import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginRegisterButton from "../../LoginResgister/jsx/LoginRegisterButton";
import "../Contents/index.css";
import { ACCOUNT_ROLE, ROUTER_PATHS } from "../../Constant";
import logo_cinema from '../../../../Media/img/logo_cinema.png';
import { Dropdown, Menu } from "antd";

const maps = [
  { path: ROUTER_PATHS.HOME, name: "Trang chủ" },
  { path: ROUTER_PATHS.FILM, name: "Phim" },
  { path: ROUTER_PATHS.FILM_SCHEDULE, name: "Lịch chiếu" },
  { path: ROUTER_PATHS.CORNER, name: "Góc điện ảnh" },
  { path: ROUTER_PATHS.EVENT, name: "Sự kiện" },
];

export function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropDownFilm, setIsDropDownFilm] = useState(false);
  const [accountRole, setAccountRole] = useState(2);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const redirectToPath = (path) => {
    navigate(path);
  };

  const handleNavbarMobileToggle = () => {
    setIsDropDownFilm(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const redirectToPathMobile = (path) => {
    setIsDropDownFilm(false);
    setIsMenuOpen(false);
    redirectToPath(path);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const renderNavbar = () => {
    return (
      <div className="fullscreen-menu">
        <i
          id="nav-toggle"
          className="bi bi-x mobile-nav-toggle"
          onClick={() => handleNavbarMobileToggle()}
        ></i>
        <ul>
          <li>
            <div onClick={() => redirectToPathMobile(ROUTER_PATHS.HOME)}>
              <span>Trang chủ</span>
            </div>
          </li>
          <li>
            <div onClick={() => setIsDropDownFilm(!isDropDownFilm)}>
              <span>Phim</span>
              <i
                className={`bi ${
                  isDropDownFilm ? "bi-chevron-up" : "bi-chevron-down"
                }`}
                style={{ marginLeft: "10px", fontSize: "medium" }}
              ></i>
            </div>
          </li>
          {isDropDownFilm && (
            <>
              <li className="drop-down" onClick={() => redirectToPathMobile("/film/1")}>
                <span >Phim đang chiếu</span>
              </li>
              <li className="drop-down" onClick={() => redirectToPathMobile("/film/2")}>
                <span>Phim sắp chiếu</span>
              </li>
            </>
          )}
          <li>
            <div
              onClick={() => redirectToPathMobile(ROUTER_PATHS.FILM_SCHEDULE)}
            >
              <span>Lịch chiếu</span>
            </div>
          </li>
          <li>
            <div onClick={() => redirectToPathMobile(ROUTER_PATHS.CORNER)}>
              <span>Góc điện ảnh</span>
            </div>
          </li>

          <li>
            <div onClick={() => redirectToPathMobile(ROUTER_PATHS.EVENT)}>
              <span>Sự kiện</span>
            </div>
          </li>
          <li>
            <div onClick={() => redirectToPathMobile(ROUTER_PATHS.DASHBOARD)}>
              <span>Dashboard</span>
            </div>
          </li>
        </ul>
      </div>
    );
  };

  const handleClose = () => {};

  const menu = (
    <Menu
      onClick={(e) => {
        setVisible(false); 
      }}
    >
      <Menu.Item key="option1">
        <Link to={"/film/1"}>Phim Đang Chiếu</Link>
      </Menu.Item>
      <Menu.Item key="option2">
        <Link to={"/film/2"}>Phim Sắp Chiếu</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {isMenuOpen && renderNavbar()}
      <header id="header" className="fixed-top pt-3 pb-2 position-relative" style={{zIndex: 999}}>
        <div className="container d-flex align-items-center items-center mx-auto flex-between">
          <div>
            <i
              id="nav-toggle"
              className={`${
                isMenuOpen ? "bi bi-x" : "bi bi-list"
              } mobile-nav-toggle site`}
              onClick={() => handleNavbarMobileToggle()}
            ></i>
          </div>
          <h3>
            <img style={{cursor: 'pointer'}} className="logo" src={logo_cinema} alt="Cinema logo" onClick={() => redirectToPath(ROUTER_PATHS.HOME)}/>
          </h3>
          <div
            id="navbar"
            className="navbar order-last order-lg-0 px-4 mx-auto mobile-cover"
          >
            {maps.map(({ path, name }) => {
              const url = window.location.href;
              const currentPath = url.substring(url.lastIndexOf("/") + 1);
              const p = path.split("/")?.[1];
              if (name === 'Phim') {
                const match = url.match(/\/(\w+)\/\d+$/);
                return (
                  <div key={name} className="me-4 py-4">
                  <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    placement="bottomLeft"
                    onVisibleChange={(v) => setVisible(v)}
                    visible={visible}
                  >
                    <Link
                      className={`nav-link scrollto ${currentPath === p || (match?.length >=2 && match[1] === p) ? "active" : ""}`}
                      onClick={(e) => {
                        e.preventDefault(); 
                        setVisible(!visible); 
                        handleClose();
                      }}
                      to={path}
                    >
                      {name}
                    </Link>
                  </Dropdown>
                </div>
                )
              }
              return (
                <div key={name} className="me-4 py-4">
                  <Link
                    className={`nav-link scrollto ${
                      currentPath === p ? "active" : ""
                    }`}
                    onClick={() => handleClose()}
                    to={path}
                  >
                    {name}
                  </Link>
                </div>
              );
            })}
            {accountRole === ACCOUNT_ROLE.ADMIN_ROLE && (
              <div className="mobile-cover">
                <Link
                  className={`dashboard-button active}`}
                  to={ROUTER_PATHS.DASHBOARD}
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>
          <LoginRegisterButton />
        </div>
      </header>
    </>
  );
}
