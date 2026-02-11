import { Box, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { tokens } from "../../../theme";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from '@mui/icons-material/Close';
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

const Item = ({ title, to, icon }) => (
  <MenuItem
    icon={icon}
    component={
      <NavLink
        to={to}
        style={({ isActive }) => ({ color: isActive ? "#6870fa" : "inherit" })}
        className={'hover:bg-transparent'}
      />
    }
  >
    <Typography>{title}</Typography>
  </MenuItem>
);

export default function SideBar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const isLgUp = useMediaQuery('(min-width:1024px)');

  return (
    <>
      {/* Overlay Mobile */}
      {!isLgUp && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}


      {/* Sidebar */}
      <Box
        className={`fixed top-0 left-0 z-50 transition-transform duration-300
          ${isLgUp ? 'translate-x-0' : (isMobileOpen ? 'translate-x-0' : '-translate-x-full')}
        `}
        style={{
          width: isCollapsed && isLgUp ? 80 : 250,
          height: '100vh',          
        }}
      >
      <Sidebar
        collapsed={isCollapsed && isLgUp}
        backgroundColor={colors.primary[400]}
        style={{
          height: '100%',
          overflowY: 'auto',
        }}
      >
          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                color: active ? "#6870fa" : colors.grey[100],
                backgroundColor: active ? colors.primary[600] : "transparent",
                "&:hover": { backgroundColor: 'transparent' },
              }),
            }}
          >
            {/* LOGO + Collapse */}
            <MenuItem
              icon={isCollapsed && isLgUp ? <MenuOutlinedIcon /> : null}
              onClick={() => {
                if (isLgUp) setIsCollapsed(!isCollapsed);
                else setIsMobileOpen(!isMobileOpen);
              }}
            >
              {!isCollapsed || !isLgUp ? (
                <Box display="flex" justifyContent="space-between" alignItems="center" ml="10px">
                  <Typography variant="h4">SHOPEASE</Typography>
                  {isLgUp && (
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  )}
                  {!isLgUp && (
                    <IconButton onClick={() => setIsMobileOpen(false)}>
                      <CloseIcon />
                    </IconButton>
                  )}
                </Box>
              ) : null}
            </MenuItem>

            {/* MENU ITEMS */}
            <Item title="Dashboard" to="/" icon={<HomeOutlinedIcon />} location={location} />
            <Typography sx={{ m: "15px 0 5px 20px" }} color={colors.grey[300]}>
              Data
            </Typography>
            <Item title="Manage Team" to="/team" icon={<PeopleOutlinedIcon />} location={location} />
            <Item title="Contacts" to="/contacts" icon={<ContactsOutlinedIcon />} location={location} />
            <Item title="Invoices" to="/invoices" icon={<ReceiptOutlinedIcon />} location={location} />
            <Typography sx={{ m: "15px 0 5px 20px" }} color={colors.grey[300]}>
              Pages
            </Typography>
            <Item title="Profile Form" to="/form" icon={<PersonOutlinedIcon />} location={location} />
            <Item title="Calendar" to="/calendar" icon={<CalendarTodayOutlinedIcon />} location={location} />
            <Item title="FAQ" to="/faq" icon={<HelpOutlineOutlinedIcon />} location={location} />
            <Typography sx={{ m: "15px 0 5px 20px" }} color={colors.grey[300]}>
              Charts
            </Typography>
            <Item title="Bar Chart" to="/bar" icon={<BarChartOutlinedIcon />} location={location} />
            <Item title="Pie Chart" to="/pie" icon={<PieChartOutlineOutlinedIcon />} location={location} />
            <Item title="Line Chart" to="/line" icon={<TimelineOutlinedIcon />} location={location} />
            <Item title="Geography" to="/geography" icon={<MapOutlinedIcon />} location={location} />
          </Menu>
        </Sidebar>
      </Box>
    </>
  );
}


