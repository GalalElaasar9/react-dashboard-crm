import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../../Header/Header';
import { mockDataContacts } from '../../../data/mockData';
import { tokens } from '../../../theme';
import { GridToolbar } from '@mui/x-data-grid';

export default function Contacts() {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const columns = [
      {field : "id" , headerName : "ID" , flex: 1},
      {field : "registrarId" , headerName : "Registrar ID" , flex: 1},
      {field : "name" , headerName : "Name" , flex:1 , cellClassName : "name-column-cell"},
      {field : "age" , headerName : "Age" , headerAlign: "left" , align : "left"},
      {field : "phone" , headerName : "Phone Number" , flex:1},
      {field : "email" , headerName : "Email" , flex:1},
      {field : "address" , headerName : "Address" , flex:1},
      {field : "city" , headerName : "City" , flex:1},
      {field : "zipCode" , headerName : "zipCode" , flex:1},
    ]
  return (
    <Box mt={'30px'} p={'0 1.5rem'}>
      <Header
        title="CONTACTS"
        subTitle="List Of Contacts For Future Reference"
      />

      {/* Responsive Wrapper */}
      <Box
        mt="20px"
        sx={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Box
          minWidth="900px" 
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
            "& .MuiDataGrid-toolbarContainer .MuiButton-root": {
              color: `${colors.primary[100]} !important`,
            },
          }}
        >
          <DataGrid
            rows={mockDataContacts}
            columns={columns}
            // slots={{ toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </Box>
  );
}
