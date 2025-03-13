import * as React from "react";
import "../Contents/SideBar.css";
import LoginRegisterButton from "../../LoginResgister/jsx/LoginRegisterButton";
import logo_cinema from '../../../../Media/img/logo_cinema.png';
import { ROUTER_PATHS } from "../../Constant";
import { useNavigate } from "react-router-dom";

export function SideBar(props) {
  const navigate = useNavigate();
  const redirectToPath = (path) => {
    navigate(path);
  };

  return (
    <>
      <header
        id="header"
        className="fixed-top pt-3 pb-2 position-relative"
        style={{ zIndex: 999 }}
      >
        <div className="container d-flex align-items-center items-center mx-auto flex-between">
          <h3>
            <img
              style={{ cursor: "pointer" }}
              className="logo"
              src={logo_cinema}
              alt="Cinema logo"
              onClick={() => redirectToPath(ROUTER_PATHS.HOME)}
            />
          </h3>
          <LoginRegisterButton />
        </div>
      </header>
    </>
  );
}
