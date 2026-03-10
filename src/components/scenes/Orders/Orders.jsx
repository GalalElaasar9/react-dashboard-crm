import { useContext } from 'react'
import { OrdersContext } from '../../../Context/OrdersContextProvider'
import { Box } from '@mui/material';
import Header from '../../Header/Header';
import LoadingScreen from '../../Loading/LoadingScreen';
import ErrorMessage from '../../Error/ErrorMessage';


export default function Orders() {
  const {data , isLoading , isError , error} = useContext(OrdersContext)
  console.log(data?.data);
  
  if(data?.data.length === 0) return <ErrorMessage error={'No orders yet'}/>

  if (isLoading) return <LoadingScreen />;
  
  if (isError) return <ErrorMessage error={error.message} />;

  return (
    <Box className="px-4">
      <Box className="mt-4">
        <Header
          title={"All Orders"}
          subTitle={"Check All Customer Orders"}
        />
      </Box>
    </Box>
  )
}
