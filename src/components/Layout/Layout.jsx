import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import SideBar from "../scenes/global/SideBar";
import TobBar from "../scenes/global/TobBar";

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isLgUp = useMediaQuery('(min-width:1024px)'); // Desktop breakpoint

  return (
    <div className="app flex h-screen relative">
      <SideBar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <div className="container !max-w-[100%] p-0">
        <main
          className="flex-1 transition-all duration-300"
          style={{
            marginLeft: isLgUp ? (isCollapsed ? "80px" : "250px") : 0
          }}
        >
          <TobBar setIsMobileOpen={setIsMobileOpen} />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
