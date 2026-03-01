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
import { useContext } from "react";
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
  return (
    <>
      {/* Overlay Mobile */}
      {!isLgUp && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <Box
        className={`fixed top-0 left-0 z-50 h-screen transition-all duration-300
        ${isLgUp ? "" : isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        sx={{
          width: isCollapsed && isLgUp ? "80px" : "250px",
          backgroundColor: colors.primary[400],
          transition: "width 0.3s ease",
          display: "flex",
          flexDirection: "column",
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
          {/* DASHBOARD */}
          <Item
            title="Dashboard"
            to="/"
            icon={<HomeOutlinedIcon />}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          

          {/* DATA */}
          {!isCollapsed && (
            <Typography sx={{ m: "15px 0 5px 20px" }} color={colors.grey[300]}>
              Data
            </Typography>
          )}
          {!token ? <>
          <Item   
            title="Login"
            to="/login"
            icon={<LoginIcon />}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Register"
            to="/register"
            icon={<AppRegistration />}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          </>:''}
          <Item
            title="Products"
            to="/products"
            icon={<PeopleOutlinedIcon />}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Brands"
            to="/brands"
            icon={<StoreOutlinedIcon />}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Categories"
            to="/categories"
            icon={<CategoryOutlinedIcon />}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Manage Team"
            to="/team"
            icon={<PeopleOutlinedIcon />}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Contacts"
            to="/contacts"
            icon={<ContactsOutlinedIcon />}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Invoices"
            to="/invoices"
            icon={<ReceiptOutlinedIcon />}
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
            icon={<PersonOutlinedIcon />}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Calendar"
            to="/calendar"
            icon={<CalendarTodayOutlinedIcon />}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="FAQ"
            to="/faq"
            icon={<HelpOutlineOutlinedIcon />}
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
            icon={<BarChartOutlinedIcon />}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Pie Chart"
            to="/pie"
            icon={<PieChartOutlineOutlinedIcon />}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Line Chart"
            to="/line"
            icon={<TimelineOutlinedIcon />}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
          <Item
            title="Geography"
            to="/geography"
            icon={<MapOutlinedIcon />}
            isCollapsed={isCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />
        </Box>
      </Box>
    </>
  );
}
