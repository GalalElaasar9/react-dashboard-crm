import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../../Header/Header';
import { mockDataContacts, mockDataInvoices } from '../../../data/mockData';
import { tokens } from '../../../theme';
import { GridToolbar } from '@mui/x-data-grid';

export default function Invoices() {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const columns = [
      {field : "id" , headerName : "ID" , flex: 0.5},
      {field : "name" , headerName : "Name" , flex:1 , cellClassName : "name-column-cell"},
      {field : "email" , headerName : "Email" , flex:1},
      {field : "cost" , headerName : "Cost" , flex:1 , alignItems:"center", renderCell:(params)=>(
        <Typography color={colors.greenAccent[500]}>${params.row.cost}</Typography>
      )},
      {field : "phone" , headerName : "Phone Number" , flex:1},
      {field : "date" , headerName : "Date" , flex:1},
    ]
  return (
    <Box mt={'25px'} p={'0 1.5rem'}>
      <Header title="Invoices" subTitle="List Of Invoices Balances" />

      {/* Responsive Wrapper */}
      <Box
        mt="20px"
        sx={{
          width: "100%",
          overflowX: "auto",  
        }}
      >
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
            }
          }}
        >
          <DataGrid
            checkboxSelection
            rows={mockDataInvoices}
            columns={columns}
          />
        </Box>
      </Box>
    </Box>
  );
}
