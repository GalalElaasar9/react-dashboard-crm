import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  DownloadOutlined,
  EmailOutlined,
  PointOfSaleOutlined,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";

import Header from "../../Header/Header";
import StatBox from "../../StatBox/StatBox";
import LineChart from "../../LineChart/LineChart";
import BarChart from "../../BarChart/BarChart";
import GeographyChart from "../../GeographyChart/GeographyChart";
import ProgressCricle from "../../ProgressCricle/ProgressCricle";
import { tokens } from "../../../theme";
import { mockTransactions } from "../../../data/mockData";

export default function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box className="container mx-0 mt-4 px-4 md:px-4 sm:!max-w-[100%]">
      
      {/* Header */}
      <Box className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <Box className="flex-1">
          <Header title="DASHBOARD" subTitle="Welcome To Your Dashboard" />
        </Box>
        <Box className="flex-shrink-0">
          <Button
            variant="contained"
            startIcon={<DownloadOutlined />}
            sx={{
              fontWeight: "bold",
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
            }}
          >
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* Stats Grid */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <StatBox
          title="12,361"
          subtitle="Emails Sent"
          progress={0.75}
          increase="+14"
          icon={<EmailOutlined sx={{ fontSize: 26, color: colors.greenAccent[600] }} />}
          backgroundColor={colors.primary[700]}
        />
        <StatBox
          title="431,225"
          subtitle="Sales Obtained"
          progress={0.5}
          increase="+14"
          icon={<PointOfSaleOutlined sx={{ fontSize: 26, color: colors.greenAccent[600] }} />}
          backgroundColor={colors.primary[700]}
        />
        <StatBox
          title="32,441"
          subtitle="New Clients"
          progress={0.3}
          increase="+5"
          icon={<PersonAdd sx={{ fontSize: 26, color: colors.greenAccent[600] }} />}
          backgroundColor={colors.primary[700]}
        />
        <StatBox
          title="1,325,134"
          subtitle="Traffic Inbound"
          progress={0.8}
          increase="+43"
          icon={<Traffic sx={{ fontSize: 26, color: colors.greenAccent[600] }} />}
          backgroundColor={colors.primary[700]}
        />
      </Box>

      {/* Row 2 */}
      <Box className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
        {/* Revenue Chart */}
        <Box
          className={`lg:col-span-8 rounded p-4 flex flex-col ${isMobile ? '!h-[450px]' :''}`}
          sx={{ backgroundColor: colors.primary[400]}}
        >
          <Box className="flex justify-between mb-2">
            <Box>
              <Typography variant="h6" color={colors.grey[100]} fontWeight="600">
                Revenue Generated
              </Typography>
              <Typography color={colors.greenAccent[500]} fontWeight="500">
                $59,342.32
              </Typography>
            </Box>
            <DownloadOutlined sx={{ fontSize: 26, color: colors.greenAccent[500] }} />
          </Box>
          <Box className={`flex-1 mt-2`} height={'500px'}>
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* Transactions */}
        <Box
          className="Recent lg:col-span-4 rounded overflow-auto max-h-[500px]"
          sx={{ backgroundColor: colors.primary[400] }}
        >
          <Box
            className="flex justify-between items-center border-b"
            sx={{ borderColor: colors.primary[300], p: 2 }}
          >
            <Typography variant="h6" color={colors.grey[100]} fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          <Box>
            {mockTransactions.map((tx) => (
              <Box
                key={tx.txId}
                className="flex justify-between items-center p-4 border-b"
                sx={{ borderColor: colors.primary[300] }}
              >
                <Box>
                  <Typography color={colors.greenAccent[500]} fontWeight="600">
                    {tx.txId}
                  </Typography>
                  <Typography color={colors.grey[100]}>{tx.user}</Typography>
                </Box>
                <Typography color={colors.grey[100]}>{tx.date}</Typography>
                <Box
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  {tx.cost}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Row 3 */}
      <Box className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
        
        {/* Campaign */}
        <Box
          className="lg:col-span-4 rounded p-6 flex flex-col items-center"
          sx={{ backgroundColor: colors.primary[400] }}
        >
          <Typography variant="h6" color={colors.grey[100]} fontWeight="600" mb={3}>
            Campaign
          </Typography>
          <ProgressCricle size={125} />
          <Typography color={colors.greenAccent[500]} fontWeight="600" mt={2}>
            $48,352 revenue generated
          </Typography>
          <Typography color={colors.grey[100]} textAlign="center">
            Includes Extra Misc Expenditures And Costs
          </Typography>
        </Box>

        {/* Sales Quantity */}
        <Box
          className="lg:col-span-4 rounded p-6"
          sx={{ backgroundColor: colors.primary[400] }}
        >
          <Typography variant="h6" color={colors.grey[100]} fontWeight="600" mb={2}>
            Sales Quantity
          </Typography>
          <Box height="250px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        {/* Geography */}
        <Box
          className="lg:col-span-4 rounded p-6"
          sx={{ backgroundColor: colors.primary[400] }}
        >
          <Typography variant="h6" color={colors.grey[100]} fontWeight="600" mb={2}>
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>

      </Box>

    </Box>
  );
}
