import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import TobBar from "../../scenes/global/TobBar";

export default function AuthLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isLgUp = useMediaQuery("(min-width:1024px)"); // Desktop breakpoint
  return (
    <div style={{ height: "100vh" }}>
      {/* <TobBar setIsMobileOpen={setIsMobileOpen} /> */}
      <Outlet />
    </div>
  );
}
