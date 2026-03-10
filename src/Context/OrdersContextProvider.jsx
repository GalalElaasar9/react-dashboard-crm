import { createContext } from 'react'
import api from '../components/Apis/AuthApis'
import { useQuery } from '@tanstack/react-query';

export let OrdersContext = createContext()
export default function OrdersContextProvider({children}) {
  async function getAllOrders(){
    const {data} = await api.get(`/orders`)
    return data;
  }
  
  const {data , isLoading , isError , error} = useQuery({
    queryKey:["orders"],
    queryFn:getAllOrders,
    staleTime: 1000 * 60 * 10,
    retry:3
  })

  return (
    <OrdersContext.Provider value={{ data , isLoading , isError , error }}>
      {children}
    </OrdersContext.Provider>
  )
}
