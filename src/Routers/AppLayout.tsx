import { Outlet } from "react-router-dom";
import Header from "../components/layouts/Header";
import { useState } from "react";
import Sidebar from "../components/layouts/Sidebar";
import ResponsiveSidebar from "../components/layouts/ResponsiveSidebar";
import AppContainer from "../components/ui/AppContainer";

export default function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div className="h-[100vh] flex justify-between items-center relative">
        <Sidebar />
        {showSidebar && <ResponsiveSidebar setShowSidebar={setShowSidebar} />}
        <div className="w-[100%] bg-gray-100 h-[100%] overflow-y-auto ">
          <Header setShowSidebar={setShowSidebar} />
          <AppContainer>
            <Outlet />
          </AppContainer>
        </div>
      </div>
    </>
  );
}
