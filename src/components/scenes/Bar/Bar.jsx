import { Box } from '@mui/material'
import BarChart from '../../BarChart/BarChart'
import Header from '../../Header/Header'
import { Helmet } from 'react-helmet-async'

export default function Bar() {
  return (
    <>
      <Helmet>
        <title>Bar Chart | Admin Dashboard</title>
      </Helmet>
      <Box mt="25px" p={'0 1.5rem'}>
        <Header title="Bar Charts" subTitle="Simple Bar Chart" />
        <Box height={"75vh"}>
          <BarChart/>
        </Box>
      </Box>
    </>
  )
}
