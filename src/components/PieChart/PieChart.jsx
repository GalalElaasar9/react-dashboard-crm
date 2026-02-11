import { Box, useTheme } from "@mui/material";
import Header from "../Header/Header";
import { mockBarData, mockPieData } from "../../data/mockData";
import { tokens } from "../../theme";
import { ResponsivePie } from "@nivo/pie";

export default function PieChart({isDashboard = false}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <ResponsivePie
      data={mockPieData}
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
      keys={["value"]}
      indexBy={"label"}
      margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
      innerRadius={0.3}
      // padAngle={0.7}
      arcLinkLabelsTextColor={colors.grey[100]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          translateX: 0,
          translateY: 56,
          itemWidth: 100,
          itemHeight: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
}


