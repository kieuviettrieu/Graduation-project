import { Header } from "../../Header/jsx/Header";
import CustomFooter from "../../Footer/jsx/Footer";
import { Outlet } from "react-router-dom";
import "../Content/HomePage.css";
import ChatBot from "../../ChatBot/jsx/ChatBot";


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
        <ChatBot />
      </div>
    </div>
  );
}
