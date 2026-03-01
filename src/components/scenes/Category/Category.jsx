import { Box } from "@mui/material";
import Header from "../../Header/Header";
import api from "../../Apis/AuthApis";
import { useQuery } from "@tanstack/react-query";
import { tokens } from "../../../theme";
import { Link } from "react-router-dom";
import ErrorMessage from "../../Error/ErrorMessage";
import LoadingScreen from "../../Loading/LoadingScreen";
import { useTheme } from "@emotion/react";

export default function Category() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
  
  if (isLoading) return <LoadingScreen/>
  

  if (isError) return <ErrorMessage error={error.message}/>

  return (
    <div className="px-4">
      <Box className="mt-4">
        <Header
          title={"All Category"}
          subTitle={"All Category Available In The Store"}
        />
        <Box className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {data?.data.map((cat) => {
            return (
              <Link key={cat._id} className="rounded !no-underline text-xl p-3 mt-3" style={{ color:colors.grey[100] , backgroundColor:colors.primary[700] }}>
                {cat.name}
              </Link>
            );
          })}
        </Box>
      </Box>
    </div>
  )
}
