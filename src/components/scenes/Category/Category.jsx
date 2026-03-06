import {
  Box,
  Button,
  Dialog,
  Grow,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../Header/Header";
import api from "../../Apis/AuthApis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tokens } from "../../../theme";
import ErrorMessage from "../../Error/ErrorMessage";
import LoadingScreen from "../../Loading/LoadingScreen";
import { useTheme } from "@emotion/react";
import { AddCircle } from "@mui/icons-material";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { CategoryContext } from "../../../Context/CategoryContextProvider";

export default function Category() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [name, setName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    data,
    isLoading,
    isError,
    error,
    isPending,
    mutate,
    deleteCategoryMutate,
  } = useContext(CategoryContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    mutate(
      { name },
      {
        onSuccess: () => {
          setName("");
          setDialogOpen(false);
          toast.success("Category Added successfully.", {
            duration: 2000,
            position: "top-right",
          });
        },
        onError: (error) => {
          toast.error(
            error.response?.data?.message || "Category Added Error !",
            {
              duration: 2000,
              position: "top-right",
            },
          );
        },
      },
    );
  }

  async function handleDeleteCategory(id) {
    deleteCategoryMutate(id, {
      onSuccess: () => {
        toast.success("Category Deleted successfully.", {
          duration: 2000,
          position: "top-right",
        });
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message || "Category Deleted Error!",
          {
            duration: 2000,
            position: "top-right",
          },
        );
      },
    });
  }

  const columns = [
    {
      field: "name",
      headerName: "Category Name",
      flex: 1,
      cellClassName: "name-cell",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      cellClassName: "actions",
      renderCell: (params) => {
        return (
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this category?")
              ) {
                handleDeleteCategory(params.row._id);
              }
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  if (isLoading) return <LoadingScreen />;

  if (isError) return <ErrorMessage error={error.message} />;

  return (
    <Box className="px-4">
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
            <Typography className="mb-3" variant="h3">
              Add Category
            </Typography>
            <TextField
              fullWidth
              label="Category Name"
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
            {isPending ? "Adding..." : "Add Category"}
          </Button>
        </form>
      </Dialog>

      <Box className="my-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ">
        <Header
          title={"All Category"}
          subTitle={"All Category Available In The Store"}
        />
        <Box >
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
            Add Category
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
