import { Box } from '@mui/material'
import Header from '../../Header/Header'
import PieChart from '../../PieChart/PieChart'

export default function Pie() {
  return (
    <Box mt="25px" p={'0 1.5rem'}>
      <Header title="Pie Charts" subTitle="Simple Pie Chart" />
      <Box height={"75vh"}>
        <PieChart/>
      </Box>
    </Box>
  )
}
