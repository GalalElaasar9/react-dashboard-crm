import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext } from "react"
import api from "../components/Apis/AuthApis";

export let CategoryContext = createContext()

export default function CategoryContextProvider({children}) {
  const queryClient = useQueryClient();
  // Get All Categories
  async function getAllCategories(){
    const {data} = await api.get('/categories')
    return data
  }
  const {data , isLoading , isError , error} = useQuery({
    queryKey:["categories"],
    queryFn:getAllCategories,
    staleTime: 1000 * 60 * 5,
    retry: 3,
  })

  // Add Category
  async function addCategory(categoryData) {
    const {data} = await api.post('/categories',categoryData)
    return data
  }
  
  const {mutate , isPending} = useMutation({
    mutationKey:["addCategory"],
    mutationFn:addCategory,
    onSuccess:()=>{queryClient.invalidateQueries({ queryKey: ["categories"] });},
  })

  // Delete Category

  async function removeCategory(id) {
    const {data} = await api.delete(`/categories/${id}`)
    return data
  }

  const {mutate:deleteCategoryMutate} = useMutation({
    mutationKey:["deleteCategory"],
    mutationFn:(id)=>removeCategory(id),
    onSuccess:()=>{queryClient.invalidateQueries({ queryKey: ["categories"] })},
  })

  return (
    <CategoryContext.Provider value={{ data , isLoading , isError , error , isPending , mutate , deleteCategoryMutate , removeCategory}}>
      {children}
    </CategoryContext.Provider>
  )
}
