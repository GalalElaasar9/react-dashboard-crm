import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

export default function Header({title , subTitle}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        color={colors.greenAccent[400]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >{subTitle}</Typography>
    </Box>
  );
}
