import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockLineData } from "../../data/mockData";

export default function LineChart({ isDashboard = false }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveLine
      data={mockLineData}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 30, right: 50, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", stacked: false }}
      curve="catmullRom"
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      useMesh
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        legend: isDashboard ? undefined : "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        legend: isDashboard ? undefined : "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      theme={{
        text: { fill: colors.grey[100] },
        axis: {
          domain: { line: { stroke: colors.grey[100] } },
          ticks: {
            line: { stroke: colors.grey[100] },
            text: { fill: colors.grey[100] },
          },
          legend: { text: { fill: colors.grey[100] } },
        },
        legends: { text: { fill: colors.grey[100] } },
        tooltip: { container: { color: colors.primary[500] } },
      }}
    />
  );
}
