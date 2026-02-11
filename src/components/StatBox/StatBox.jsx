import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box, Typography } from "@mui/material";
import ProgressCricle from "../ProgressCricle/ProgressCricle";

export default function StatBox({title , subtitle , icon , progress , increase}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width={"100%"} sx={{ background:colors.primary[400], p:"25px" , borderRadius:"7px" }}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box>
          {icon}
          <Typography variant="h4" fontWeight={'bold'} sx={{ color:colors.grey[100] }}>
            {title}
          </Typography>
        </Box>

        <Box>
          <ProgressCricle progress={progress} />
        </Box>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
            <Typography variant="h5" sx={{ color:colors.greenAccent[500] }}>
            {subtitle}
          </Typography>
            <Typography variant="h5" fontStyle={'italic'} sx={{ color:colors.greenAccent[600] }}>
            {increase}
          </Typography>
        </Box>
    </Box>
  )
}
