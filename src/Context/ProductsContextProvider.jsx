import { createContext } from "react"
import api from "../components/Apis/AuthApis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export let productsContext = createContext()
export default function ProductsContextProvider({children}) {
  const queryClient = useQueryClient();

  // Get All Products 
  async function getAllProducts() {
    const { data } = await api.get(`/products`);
    return data;
  }

  const {data, isLoading, isError , error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 10,
    retry: 3,
    refetchIntervalInBackground: false,
  });

    // Delete Product
    async function removeProduct(id) {
      const {data} = await api.delete(`/products/${id}`)
      return data
    }
  
    const {mutate:deleteProduct} = useMutation({
      mutationKey:["deleteProduct"],
      mutationFn:(id)=>removeProduct(id),
      onSuccess:()=>{
        queryClient.invalidateQueries({ queryKey: ["products"] })
      },  
    })

  return (
    <productsContext.Provider value={{ data, isLoading, isError , error , deleteProduct }}>
      {children}
    </productsContext.Provider>
  )
}
