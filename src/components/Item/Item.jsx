import { Typography, Box, Tooltip, useMediaQuery, useTheme, Icon } from "@mui/material";
import { NavLink } from "react-router-dom";
import { tokens } from "../../theme";
import React from "react";

function Item({
  title,
  to,
  Icon,
  isCollapsed,
  setIsMobileOpen,
}) {
  const isLgUp = useMediaQuery("(min-width:1024px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <NavLink
      to={to}
      onClick={() => {
        if (!isLgUp && setIsMobileOpen) {
          setIsMobileOpen(false);
        }
      }}
      style={{ textDecoration: "none" }}
    >
      {({ isActive }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            width: "100%",
            px: 2,
            py: 1.5,
            cursor: "pointer",
            borderLeft: isActive
              ? `4px solid ${colors.blueAccent[500]}`
              : "4px solid transparent",
            // backgroundColor: isActive
            //   ? colors.primary[500]
            //   : "transparent",
            color: isActive
              ? colors.blueAccent[500]
              : colors.grey[100],
            transition: "all 0.3s ease",
          }}
        >
          <Tooltip
            title={isCollapsed ? title : ""}
            placement="right"
            arrow
          >
            <Box display="flex" alignItems="center" gap={2} width="100%">
              <Icon/>
              {!isCollapsed && (
                <Typography>
                  {title}
                </Typography>
              )}
            </Box>
          </Tooltip>
        </Box>
      )}
    </NavLink>
  );
}

export default React.memo(Item)