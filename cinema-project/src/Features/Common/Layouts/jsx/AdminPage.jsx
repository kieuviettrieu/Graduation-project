import { Outlet } from "react-router-dom";
import "../Content/AdminPage.css";
import { SideBar } from "../../Admin/jsx/SideBar";
import CustomFooter from "../../Footer/jsx/Footer";

export function AdminPage(props) {
  return (
    <div>
      <div className="App">
        <SideBar />
        <div className="main">
          <Outlet />
        </div>
        <CustomFooter />
      </div>
    </div>
  );
}