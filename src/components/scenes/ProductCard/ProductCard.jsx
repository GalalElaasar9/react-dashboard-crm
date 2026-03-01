// import { Box, Typography, Button, IconButton, useTheme } from "@mui/material";
// import { tokens } from "../../../theme";
// import { DataGrid } from "@mui/x-data-grid";

// export default function ProductCard({ product, colors }) {
//   const theme = useTheme()
//   const colors = tokens(theme.palette.mode)

//   const columns = [
//     {field : "id" , headerName : "ID" , flex: 0.5},
//     {field : "name" , headerName : "Name" , flex:1 , cellClassName : "name-column-cell"},
//     {field : "email" , headerName : "Email" , flex:1},
//     {field : "cost" , headerName : "Cost" , flex:1 , alignItems:"center", renderCell:(params)=>(
//       <Typography color={colors.greenAccent[500]}>${params.row.cost}</Typography>
//     )},
//     {field : "phone" , headerName : "Phone Number" , flex:1},
//     {field : "date" , headerName : "Date" , flex:1},
//     ]
//   return (
//     <>
//               <DataGrid
//                 checkboxSelection
//                 rows={mockDataInvoices}
//                 columns={columns}
//               />    
//     <Box
//       className="rounded-xl p-3 flex flex-col relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
//       backgroundColor={colors.primary[400]}
//     >

//       {/* IMAGE */}
//       <Box>
//         <div className="h-[260px] flex items-center justify-center overflow-hidden">
//           <img
//             src={product.images[0]}
//             className="max-h-full object-contain transition-transform duration-300 hover:scale-105"
//             alt={"There are problems uploading the image."}
//           />
//         </div>

//         {/* TITLE */}
//         <Typography
//           variant="body1"
//           color={colors.grey[100]}
//           className="mt-3 line-clamp-2 font-semibold"
//         >
//           {product.name}
//         </Typography>
//       </Box>
//         {/* DESCRIPTION */}
//         <Typography
//           variant="body1"
//           color={colors.greenAccent[300]}
//           className="mt-3 line-clamp-2 font-semibold"
//         >
//           {product?.description}
//         </Typography>
//     </Box>
//     </>
//   );
// }
