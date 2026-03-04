import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../Header/Header";
import { tokens } from "../../../theme";
import api from "../../Apis/AuthApis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import ProductCard from "../ProductCard/ProductCard";
import LoadingScreen from "../../Loading/LoadingScreen";
import { DataGrid } from "@mui/x-data-grid";
import { AddCircle } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import toast from "react-hot-toast";
import { useState } from "react";
import ErrorMessage from "../../Error/ErrorMessage";
import ProductFormDialog from "../../ProductFormDialog/ProductFormDialog";

export default function Products() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formDialogOpen , setFormDialogOpen] = useState(false)
  const [formMode , setFormMode] = useState("add") // add or edit

  // Get All Products 
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

  // Delete Product
  async function removeProduct(id) {
    const {data} = await api.delete(`/products/${id}`)
    return data
  }

  const {mutate:deleteProduct} = useMutation({
    mutationKey:["deleteProduct"],
    mutationFn:(id)=>removeProduct(id),
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product Deleted successfully.",{
        duration:2000,
        position:'top-right'
      })
    },
    onError:(error)=>{
      toast.error(error.response?.data?.message || "Product Deleted Error !",{
        duration:2000,
        position:'top-right'
      })
    }    
  })

  if (isError) return <ErrorMessage error={error.message}/>

  if (isLoading) return <LoadingScreen/>

    const columns = [
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
    {field : "price" , headerName : "Price" , flex:0.5},
    {field : "stock" , headerName : "Stock" , flex:0.5},
    {field : "brand" , headerName : "Brand" , flex:0.5 , renderCell:(params)=>{
      return <Typography color={colors.greenAccent[500]}>{params.row.brand.name}</Typography>
    }},
    {field : "category" , headerName : "Category" , flex:0.5 , renderCell:(params)=>{
      return <Typography color={colors.greenAccent[500]}>{params.row.category.name}</Typography>
    }},
    {
      field: "colors",
      headerName: "Colors",
      flex: 1,
      renderCell: (params) => {
        const colors = params.row.colors[0] ? JSON.parse(params.row.colors[0]) : [];        
        if (colors.length === 0) return "No Colors";
        return (
          <Box className="flex flex-wrap" gap={1}>
            {colors.map((c, idx) => (
              <Box
                key={idx}
                sx={{
                  width: 25,
                  height: 25,
                  borderRadius: "50%",
                  backgroundColor: c,
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </Box>
        );
      },
    },
    {field : "sizes" , headerName : "Sizes" , flex:1 , renderCell:(params)=>{
      const sizes = params.row.sizes[0] ? JSON.parse(params.row.sizes[0]) : []
      if (sizes.length === 0) return "No Sizes"
      return (
        <Box display="flex" gap={1}>
          {sizes.map((s , idx)=>{
            return <Box
                    className="flex justify-center items-center flex-wrap"
                    key={idx}
                    sx={{
                      width: 25,
                      height: 25,
                      borderRadius: "50%",
                      backgroundColor: colors.primary[700],
                    }}
                  >
                  <Typography variant="body2">
                    {s}
                  </Typography>
                  </Box>
            })}
            
        </Box>
      )
    }},
    {field : "actions" , headerName : "Actions" , flex:1 , cellClassName : "actions" , renderCell:(params)=>{
      return <Box className="flex flex-wrap">
            <IconButton color="success" 
              onClick={()=>{
                setSelectedProduct(params.row)
                setDialogOpen(true)
              }}>
              <VisibilityIcon />  
            </IconButton>
            <IconButton color="default" 
              onClick={()=>{
                setFormMode("edit");
                setSelectedProduct(params.row);
                setFormDialogOpen(true)
              }}
            >
              <EditIcon />  
            </IconButton>
            <IconButton color="error" onClick={()=>{if(window.confirm("Are you sure you want to delete this category?")){
                deleteProduct(params.row._id)
              }}}>
              <DeleteIcon />  
            </IconButton>
      </Box>
    }},
  ]

  return (
    <Box className="px-4">
      <Box className="my-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ">
        <Header
          title={"All Products"}
          subTitle={"All Products Available In The Store"}
        />
        <Box>
          <Button
            className="w-full sm:w-auto"
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              p: "10px 20px",
              fontWeight: "bold",
            }}
            onClick={()=>{
              setFormMode("add");
              setFormDialogOpen(true)
              setSelectedProduct(null)
            }}
          >
            <AddCircle className="mr-2" />
            Add Product
          </Button>
        </Box>
      </Box>
            {/* View Product */}
      <Dialog
        open={dialogOpen}
        onClose={()=>setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle variant="h2">Product Title</DialogTitle>
        <DialogContent dividers>
          {selectedProduct && (
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography><strong style={{ color:colors.greenAccent[500] }}>Name:</strong> {selectedProduct.name}</Typography>
              <Typography><strong style={{ color:colors.greenAccent[500] }}>Price:</strong> ${selectedProduct.price}</Typography>
              <Typography><strong style={{ color:colors.greenAccent[500] }}>Description:</strong> {selectedProduct.description}</Typography>
              {selectedProduct.images && (
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  style={{ maxWidth: "200px", width:"100%" , borderRadius: "10px" ,  }}
                />
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Add/Edit Product */}
      <ProductFormDialog open={formDialogOpen} setOpen={setFormDialogOpen} mode={formMode} product={selectedProduct}/>
      <Box className="overflow-auto">
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
          }}
        >
        <DataGrid
          rows={data?.data || []}
          columns={columns}
          getRowId={(row) => row._id}
          getRowHeight={() => 100}
        />
        </Box>
      </Box>
    </Box>
  );
}
