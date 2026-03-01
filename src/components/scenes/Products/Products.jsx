import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../Header/Header";
import { tokens } from "../../../theme";
import api from "../../Apis/AuthApis";
import { useQuery } from "@tanstack/react-query";
// import ProductCard from "../ProductCard/ProductCard";
import LoadingScreen from "../../Loading/LoadingScreen";
import { DataGrid } from "@mui/x-data-grid";

export default function Products() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    const columns = [
    // {field : "id" , headerName : "ID" , flex: 0.5},
    {field : "name" , headerName : "Name" , flex:1 , cellClassName : "name-cell"},
  {
    field: "image",
    headerName: "Image",
    flex: 1,
    renderCell: (params) => (
      <img
        src={params.row.images[0]}
        alt={params.row.name}
        style={{
          width: "95px",
          height: "95px",
          borderRadius: "8px",
        }}
      />
    ),
  },    
  {field : "description" , headerName : "Description" , flex:1},
    // {field : "cost" , headerName : "Cost" , flex:1 , alignItems:"center", renderCell:(params)=>(
    //   <Typography color={colors.greenAccent[500]}>${params.row.cost}</Typography>
    // )},
    {field : "price" , headerName : "Price" , flex:1},
    {field : "stock" , headerName : "Stock" , flex:1},
    {field : "brand" , headerName : "Brand" , flex:1 , renderCell:(params)=>{
      return <Typography color={colors.greenAccent[500]}>{params.row.brand.name}</Typography>
    }},
    {field : "category" , headerName : "Category" , flex:1 , renderCell:(params)=>{
      return <Typography color={colors.greenAccent[500]}>{params.row.category.name}</Typography>
    }},
    {field : "colors" , headerName : "Colors" , flex:1 , renderCell:(params)=>{
      const colors = params.row.colors[0] || [];
      if(colors)
      if (){
        return <Box
            sx={{
              width: 25,
              height: 25,
              borderRadius: "50%",
              backgroundColor: params.row.color,
              border: "1px solid #ccc",
            }}
          />
      }else{
        return "No Colors"
      }
    }},
  ]

  async function getAllProducts() {
    const { data } = await api.get(`/products`);
    return data;
  }

  const {data, isLoading, isError , error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5,
    retry: 3,
    refetchIntervalInBackground: false,
    // placeholderData: (previousData) => previousData
  });

  if (isError) return <ErrorMessage error={error.message}/>

  if (isLoading) return <LoadingScreen/>

  // const rows = data?.data?.map((product) => ({
  //   id: product._id,   // مهم جدًا
  //   name: product.name,
  //   imgage: product.images[0],
  //   description: product.description,
  //   price: product.price
  // }));

  return (
    <div className="px-4">
      <Box className="mt-4">
        <Header
          title={"All Products"}
          subTitle={"All Products Available In The Store"}
        />
                <Box
                  minWidth="800px"
                  sx={{
                    "& .MuiDataGrid-root": {
                      border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "none",
                    },
                    "& .name-column-cell": {
                      color: colors.greenAccent[300],
                      fontWeight: "600",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: colors.blueAccent[700],
                      borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                      borderTop: "none",
                      backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                      color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-cell" :{
                      display:"flex",
                      alignItems:'center',
                    },
                    "& .MuiDataGrid-row" :{
                      // minHeight:"100px !important",
                      // maxHeight:"100px !important",
                      // height:"100px !important"
                    }
                  }}
                >
                <DataGrid
                  rows={data?.data || []}
                  columns={columns}
                  getRowId={(row) => row._id}
                  getRowHeight={() => 100}
                />


                </Box>
        {/* <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {data?.data.map((product) => {
            return (
              <ProductCard product={product} colors={colors} key={product._id} />
            );
          })}
        </Box> */}
      </Box>
    </div>
  );
}
