import { Box } from '@mui/material'
import Header from '../../Header/Header'
import LineChart from '../../LineChart/LineChart'
import { Helmet } from 'react-helmet-async'

export default function Pie() {
  return (
    <>
      <Helmet>
        <title>Line Chart | Admin Dashboard</title>
      </Helmet>
      <Box mt="25px" p={'0 1.5rem'}>
        <Header title="Line Charts" subTitle="Simple Line Chart" />
        <Box height={"75vh"}>
          <LineChart/>
        </Box>
      </Box>
    </>
  )
}
