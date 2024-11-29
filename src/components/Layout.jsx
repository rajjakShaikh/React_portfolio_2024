import { Outlet } from "react-router-dom";
import Sidebar from "../pages/sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-[80px] lg:ml-[240px]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
