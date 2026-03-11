import { Box, colors, useTheme } from '@mui/material'
import Header from '../../Header/Header'
import GeographyChart from '../../GeographyChart/GeographyChart'
import { tokens } from '../../../theme'
import { Helmet } from 'react-helmet-async';

export default function Pie() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Helmet>
        <title>Geography Chart | Admin Dashboard</title>
      </Helmet>
      <Box mt="25px" p={'0 1.5rem'}>
        <Header title="Geography Charts" subTitle="Simple Geography Chart" />
        <Box height={"75vh"} border={`1px solid ${colors.grey[100]}`} borderRadius={'4px'}>
          <GeographyChart/>
        </Box>
      </Box>
    </>
  )
}
