import { Box, useTheme } from "@mui/material";
import Header from "../Header/Header";
import { ResponsiveBar } from "@nivo/bar";
import { mockBarData } from "../../data/mockData";
import { tokens } from "../../theme";

export default function BarChart({isDashboard = false}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveBar
      data={mockBarData}
      theme={{ 
        axis:{
          domain:{
            line:{
              stroke: colors.grey[100]
            }
          },
          legend:{
            text:{
              fill: colors.grey[100]
            }
          },
          ticks:{
            line:{
              stroke: colors.grey[100],
              strokeWidth:1
            },
            text:{
              stroke: colors.grey[100],
            }
          }
        },
        legends:{
          text:{
            fill: colors.grey[100]
          }
        }
      }}
      keys={["hot dog", "burger", "kebab", "donut"]}
      indexBy={"country"}
      margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type:'linear' }}
      indexScale={{ type:'band' , round:'true' }}
      colors={{ scheme: "nivo" }}
      axisBottom={{
        tickRotation: -30,
        legend: isDashboard ? undefined : "country", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        legend: isDashboard ? undefined : "Food", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
    />
  );
}
