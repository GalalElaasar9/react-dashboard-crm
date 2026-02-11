import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import useMediaQuery from '@mui/material/useMediaQuery';

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";

export default function TobBar({ setIsMobileOpen }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isLgUp = useMediaQuery('(min-width:1024px)');

  // اختار background حسب الـ mode
  const searchBg = theme.palette.mode === "dark" ? colors.primary[600] : colors.grey[900];

  return (
    <Box
      className="flex items-center justify-between px-4 py-3 sticky top-0 z-30"
      bgcolor={colors.primary[400]}
    >
      {/* LEFT */}
      <Box className="flex items-center gap-2">
        {!isLgUp && (
          <IconButton onClick={() => setIsMobileOpen(true)}>
            <MenuOutlinedIcon />
          </IconButton>
        )}

        {/* Search Box */}
        <Box
          className="hidden lg:flex items-center"
          bgcolor={searchBg}
          borderRadius="6px"
          px={1}
        >
          <InputBase placeholder="Search" sx={{ ml: 1, flex: 1 }} />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      {/* RIGHT */}
      <Box className="flex items-center gap-1">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

        <IconButton>
          <NotificationsNoneIcon />
        </IconButton>

        <IconButton className="hidden sm:inline-flex">
          <PersonIcon />
        </IconButton>

        <IconButton className="hidden md:inline-flex">
          <SettingsIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
