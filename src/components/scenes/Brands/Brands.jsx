import { Box } from "@mui/material";
import Header from "../../Header/Header";
import api from "../../Apis/AuthApis";
import { useQuery } from "@tanstack/react-query";
import { tokens } from "../../../theme";
import { Link } from "react-router-dom";
import ErrorMessage from "../../Error/ErrorMessage";
import LoadingScreen from "../../Loading/LoadingScreen";
import { useTheme } from "@emotion/react";

export default function Brands() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  async function getAllBrands(){
    const {data} = await api.get('/brands')
    console.log(data);
    return data
  }

  const {data , isLoading , isError , error} = useQuery({
    queryKey:["brands"],
    queryFn:getAllBrands,
    staleTime: 1000 * 60 * 5,
    retry: 3,
  })
  
  if (isLoading) return <LoadingScreen/>
  

  if (isError) return <ErrorMessage error={error.message}/>

  return (
    <div className="px-4">
      <Box className="mt-4">
        <Header
          title={"All Brands"}
          subTitle={"All Brands Available In The Store"}
        />
        <Box className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {data?.data.map((brand) => {
            return (
              <Link key={brand._id} className="rounded !no-underline text-xl p-3 mt-3" style={{ color:colors.grey[100] , backgroundColor:colors.primary[400] }}>
                {brand.name}
              </Link>
            );
          })}
        </Box>
      </Box>
    </div>
  )
}
