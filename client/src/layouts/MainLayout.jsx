import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import HomeBG from "../components/Home/HomeBG";

export default function MainLayout() {
  return (
    <div className="body-container bg-gradient-to-bl from-gray-950 to-rose-950">
      <Header />
      <Sidebar />
      <main id="main" className="bg-transparent relative isolate">
        <HomeBG />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
