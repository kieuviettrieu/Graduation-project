import { Outlet } from "react-router-dom";
import "../Content/AdminPage.css";
import { SideBar } from "../../Admin/jsx/SideBar";
import CustomFooter from "../../Footer/jsx/Footer";
import LeftSideBar from "../../Admin/jsx/LeftSideBar";

export function AdminPage(props) {
  return (
    <div>
      <div className="App">
        <SideBar />
        <div className="main">
          <div className="flex">
            <div className="sidebar">
              <LeftSideBar />
            </div>
            <div className="display">
              <Outlet />
            </div>
          </div>
        </div>
        {/* <CustomFooter /> */}
      </div>
    </div>
  );
}
