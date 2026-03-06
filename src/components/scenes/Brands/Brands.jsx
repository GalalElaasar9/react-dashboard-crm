import {
  Box,
  Button,
  Dialog,
  Grow,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../Header/Header";
import { tokens } from "../../../theme";
import ErrorMessage from "../../Error/ErrorMessage";
import LoadingScreen from "../../Loading/LoadingScreen";
import { useTheme } from "@mui/material/styles";
import { AddCircle } from "@mui/icons-material";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { DataGrid } from "@mui/x-data-grid";
import { brandContext } from "../../../Context/BrandContextProvider";

export default function Brands() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isLoading, isError, error, isPending, mutate } =
    useContext(brandContext);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    mutate(
      { name },
      {
        onSuccess: () => {
          setDialogOpen(false);
          setName("");
          toast.success("Brand Added successfully.", {
            duration: 2000,
            position: "top-right",
          });
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Brand Added Error !", {
            duration: 2000,
            position: "top-right",
          });
        },
      },
    );
  };

  if (isLoading) return <LoadingScreen />;

  if (isError) return <ErrorMessage error={error.message} />;

  const columns = [
    {
      field: "name",
      headerName: "Brand Name",
      flex: 1,
      cellClassName: "name-cell",
    },
  ];

  return (
    <Box className="px-4">
      {/* Dialog Add Brands */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        TransitionComponent={Grow}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            padding: "20px 10px !important",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1F2A40 !important" : "#F5F5F5 !important",
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box>
            <Typography variant="h3" className="mb-3">
              Add Brand
            </Typography>
            <TextField
              fullWidth
              label="Brand Name"
              variant="filled"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Box>
          <Button
            disabled={isPending}
            type="submit"
            variant="contained"
            className="w-full mt-3 sm:w-auto !font-bold"
            sx={{ backgroundColor: colors.greenAccent[500],}}
          >
            {isPending ? "Adding..." : "Add Brand"}
          </Button>
        </form>
      </Dialog>

      <Box className="my-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ">
        <Header
          title={"All Brands"}
          subTitle={"All Brands Available In The Store"}
        />
        <Box>
          <Button
            onClick={() => setDialogOpen(true)}
            className="w-full sm:w-auto"
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              p: "10px 20px",
              fontWeight: "bold",
            }}
          >
            <AddCircle className="mr-2" />
            Add Brand
          </Button>
        </Box>
      </Box>
      <Box className="overflow-auto">
        <Box
          // minWidth="800px"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-cell": {
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
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
            },
          }}
        >
          <DataGrid
            rows={data?.data || []}
            columns={columns}
            getRowId={(row) => row._id}
          />
        </Box>
      </Box>
    </Box>
  );
}
