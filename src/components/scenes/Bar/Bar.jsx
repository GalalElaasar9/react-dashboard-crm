import { Box } from '@mui/material'
import BarChart from '../../BarChart/BarChart'
import Header from '../../Header/Header'

export default function Bar() {
  return (
    <Box mt="25px" p={'0 1.5rem'}>
      <Header title="Bar Charts" subTitle="Simple Bar Chart" />
      <Box height={"75vh"}>
        <BarChart/>
      </Box>
    </Box>
  )
}
