import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext } from "react"
import api from "../components/Apis/AuthApis";

export let brandContext = createContext()
export default function BrandContextProvider({children}) {
  const queryClient = useQueryClient();
    // Get All Brands 
  async function getAllBrands(){
    const {data} = await api.get('/brands')
    return data
  }

  const {data , isLoading , isError , error} = useQuery({
    queryKey:["brands"],
    queryFn:getAllBrands,
    staleTime: 1000 * 60 * 5,
    retry: 3,
  })

    // Add Brand
    async function addBrand(brandData) {
      const {data} = await api.post('/brands' , brandData);
      return data
    }
  
    const {mutate , isPending } = useMutation({
      mutationKey:["addBrand"],
      mutationFn:addBrand,
      onSuccess:()=>{ queryClient.invalidateQueries({ queryKey: ["brands"] })},
    })

  return (
    <brandContext.Provider value={{ data , isLoading , isError , error , isPending , mutate}}>
      {children}
    </brandContext.Provider>
  )
}
