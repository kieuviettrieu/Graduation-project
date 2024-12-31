import { Header } from "../../Header/jsx/Header";
import CustomFooter from "../../Footer/jsx/Footer";
import { Outlet } from "react-router-dom";
import "../Content/HomePage.css";


export function HomePage(props) {
  const theme = {
    // backgroundColor: '#f1e9e9',
  }
  return (
    <div>
      <div className="App" style={theme}>
        <Header />
        <div className="main">
          <Outlet />
        </div>
        <CustomFooter />
      </div>
    </div>
  );
}
