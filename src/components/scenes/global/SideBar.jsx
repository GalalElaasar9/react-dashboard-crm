import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistration from '@mui/icons-material/AppRegistration';
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

import Item from "../../Item/Item";
import { useContext, useEffect } from "react";
import { authContext } from "../../../Context/AuthContextProvider";

export default function SideBar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLgUp = useMediaQuery("(min-width:1024px)");
  let {token} = useContext(authContext)

  useEffect(() => {
    if (isLgUp) {
      setIsMobileOpen(false);
    }
  }, [isLgUp]);

  return (
    <>
      {/* Overlay Mobile */}
      {/* <div
        // className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          !isLgUp && isMobileOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
      /> */}

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 50,
          width: isCollapsed && isLgUp ? "80px" : "250px",
          backgroundColor: colors.primary[400],
          display: "flex",
          flexDirection: "column",

          transform: !isLgUp
            ? isMobileOpen
              ? "translateX(0)"
              : "translateX(-100%)"
            : "translateX(0)",

          transition: "transform 0.4s ease-in-out, width 0.3s ease-in-out",
        }}
      >
        {/* Header */}
        <Box className="flex items-center justify-between p-4 !py-4 !pl-4">
          {!isCollapsed && (
            <Typography variant="h4" color={colors.grey[100]}>
              SHOPEASE
            </Typography>
          )}

          <IconButton
            onClick={() => {
              if (isLgUp) setIsCollapsed(!isCollapsed);
              else setIsMobileOpen(false);
            }}
          >
            {isLgUp ? (
              <MenuOutlinedIcon sx={{ color: colors.grey[100] }} />
            ) : (
              <CloseIcon sx={{ color: colors.grey[100] }} />
            )}
          </IconButton>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: colors.blueAccent[500],
              borderRadius: "10px",
            },
            overflowX: "hidden",
          }}
        >

        {!token ? <>
          <Item   
            title="Login"
            to="/login"
            Icon={LoginIcon}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          </>: <Item
            title="Register"
            to="/register"
            Icon={AppRegistration}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />}

          {/* DASHBOARD */}
          <Item
            title="Dashboard"
            to="/"
            Icon={HomeOutlinedIcon}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          

          {/* DATA */}
          {!isCollapsed && (
            <Typography sx={{ m: "15px 0 5px 20px" }} color={colors.grey[300]}>
              Data
            </Typography>
          )}
          <Item
            title="Products"
            to="/products"
            Icon={PeopleOutlinedIcon}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Brands"
            to="/brands"
            Icon={StoreOutlinedIcon}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Categories"
            to="/categories"
            Icon={CategoryOutlinedIcon}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Manage Team"
            to="/team"
            Icon={PeopleOutlinedIcon}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Contacts"
            to="/contacts"
            Icon={ContactsOutlinedIcon}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Invoices"
            to="/invoices"
            Icon={ReceiptOutlinedIcon}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />

          {/* PAGES */}
          {!isCollapsed && (
            <Typography sx={{ m: "15px 0 5px 20px" }} color={colors.grey[300]}>
              Pages
            </Typography>
          )}

          <Item
            title="Profile Form"
            to="/form"
            Icon={PersonOutlinedIcon}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Calendar"
            to="/calendar"
            Icon={CalendarTodayOutlinedIcon}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="FAQ"
            to="/faq"
            Icon={HelpOutlineOutlinedIcon}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />

          {/* CHARTS */}
          {!isCollapsed && (
            <Typography sx={{ m: "15px 0 5px 20px" }} color={colors.grey[300]}>
              Charts
            </Typography>
          )}

          <Item
            title="Bar Chart"
            to="/bar"
            Icon={BarChartOutlinedIcon}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Pie Chart"
            to="/pie"
            Icon={PieChartOutlineOutlinedIcon}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Line Chart"
            to="/line"
            Icon={TimelineOutlinedIcon}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Geography"
            to="/geography"
            Icon={MapOutlinedIcon}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
        </Box>
      </Box>
    </>
  );
}
