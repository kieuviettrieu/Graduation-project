import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginRegisterButton } from "../../LoginResgister/jsx/LoginRegisterButton";
import { ThemeSwitch } from "../../ThemeSwitch/ThemeSwitch";
import "../Contents/index.css";
import { ROUTER_PATHS } from "../../Constant";

const maps = [
  { path: ROUTER_PATHS.HOME, name: "Nature Cinema" },
  { path: ROUTER_PATHS.BOOKING, name: "Đặt vé" },
  { path: ROUTER_PATHS.FILM, name: "Phim" },
  { path: ROUTER_PATHS.CORNER, name: "Góc điện ảnh" },
  { path: ROUTER_PATHS.EVENT, name: "Sự kiện" },
];

export function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropDownFilm, setIsDropDownFilm] = useState(false);
  const navigate = useNavigate();

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
          onClick={() => handleNavbarMobileToggle()} // Hàm đóng mở toàn bộ menu
        ></i>
        <ul>
          <li>
            <div onClick={() => redirectToPathMobile(ROUTER_PATHS.HOME)}>
              <span>Trang Chủ</span>
            </div>
          </li>
          <li>
            <div onClick={() => redirectToPathMobile(ROUTER_PATHS.BOOKING)}>
              <span>Đặt vé</span>
            </div>
          </li>
          <li>
            <div onClick={() => setIsDropDownFilm(!isDropDownFilm)}>
              <span>Phim</span>
              <i className={`bi ${isDropDownFilm ? 'bi-chevron-up' : 'bi-chevron-down'}`} style={{ marginLeft: '10px', fontSize: 'medium' }}></i>
            </div>
          </li>
          {isDropDownFilm && (
            <>
              <li className="drop-down">
                <span>Phim đang chiếu</span>
              </li>
              <li className="drop-down">
                <span>Phim sắp chiếu</span>
              </li>
            </>
          )}
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
  const navigations = [];

  return (
    <>
      {isMenuOpen && renderNavbar()}
      <header id="header" className="fixed-top pt-3 pb-2 position-relative">
        <div className="container d-flex align-items-center items-center mx-auto flex-between">
          <i
            id="nav-toggle"
            className={`${
              isMenuOpen ? "bi bi-x" : "bi bi-list"
            } mobile-nav-toggle`}
            onClick={handleNavbarMobileToggle}
          ></i>
          <h1 className="logo">
            <a href="/" className="site">
              Nature Cinema
            </a>
          </h1>
          <div
            id="navbar"
            className="navbar order-last order-lg-0 px-4 mx-auto mobile-cover"
          >
            {maps.map(({ path, name }) => {
              const currentPath = "";
              const p = path.split("/")?.[1];
              return (
                <div key={name} className="me-4 py-4">
                  <Link
                    className={`nav-link scrollto ${
                      currentPath === p ? "active" : ""
                    }`}
                    onClick={handleClose}
                    to={path}
                  >
                    {name}
                  </Link>
                </div>
              );
            })}
            <div className="mobile-cover">
              <Link className={`dashboard-button active}`} to={ROUTER_PATHS.DASHBOARD}>
                Dashboard
              </Link>
            </div>
          </div>
          <LoginRegisterButton />
          <div className="mobile-cover">
            <ThemeSwitch />
          </div>
        </div>
      </header>
    </>
  );
}
