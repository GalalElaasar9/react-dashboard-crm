import {
  Box,
  Button,
  Dialog,
  DialogActions,
  FormControl,
  Grow,
  IconButton,
  InputLabel,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../Header/Header";
import { mockDataTeam } from "../../../data/mockData";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
  AddCircle,
  Edit,
  Delete,
} from "@mui/icons-material";
import { tokens } from "../../../theme";
import { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import MenuItem from "@mui/material/MenuItem";

export default function Team() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState(mockDataTeam);

  const inNonMobile = useMediaQuery("(min-width:600px)");

  const accessOptions = [
    { value: "user", label: "User" },
    { value: "manager", label: "Manager" },
    { value: "admin", label: "Admin" },
  ];

  const userValidation = yup.object().shape({
    firstName: yup.string().min(3).required("First Name Is Required"),
    lastName: yup.string().min(3).required("Last Name Is Required"),
    email: yup.string().email().required("Email Is Required"),
    age: yup.number().required("Age Is Required"),
    phone: yup
    .string()
    .matches(/^01[0125]\d{8}$/, "Phone Must Be Egyption Phone Number")
    .required("Phone Number Is Required"),
    // assess: yup.required("Assess Is Required"),
  });

  const isEditMode = Boolean(editingUser)
  
  const initialValues = isEditMode ? {...editingUser} : {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    access: "user",
  };

  function getNextId(users) {
    if (users.length === 0) return 1;
    return Math.max(...users.map((u) => Number(u.id))) + 1;
  }

  function handleFormSubmit(values, { resetForm }) {
    console.log(values);
    if (isEditMode) {
      setUsers(prev => prev.map(user=> user.id === editingUser.id ? {...user , ...values , name:`${values.firstName} ${values.lastName}`} : user))
    }else{
      const newUser = {
        id: getNextId(users),
        name: `${values.firstName} ${values.lastName}`,
        age: values.age,
        phone: values.phone,
        email: values.email,
        access: values.access
      };
      setUsers((prev) => [...prev, newUser]);
    }
    resetForm();
    setDialogOpen(false);
    setEditingUser(null)
  }


  function handleEditUser(row) {
    console.log(row);
    const nameParts = row.name.split(" ");
    const editUser = {
      id: row.id,
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(" "),
      email: row.email,
      phone: row.phone,
      age: row.age,
      access: row.access,
    }
    setEditingUser(editUser)
    setDialogOpen(true)
  }

  
  function handleDelete(id) {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  }

  function handleAddUser() {
    setEditingUser(null);
    setDialogOpen(true);
  }

  const columns = [
    // { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column-cell",
    },
    { field: "age", headerName: "Age", headerAlign: "left", align: "left" },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            bgcolor={
              access === "admin"
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlined />}
            {access === "manager" && <SecurityOutlined />}
            {access === "user" && <LockOpenOutlined />}
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box display="flex" gap="10px" backgroundColor={colors.greenAccent[600]} 
            width={{ xs:"100%" , md:"50%" }}
            // width="50% !important"
            m="0 auto"
            p="5px"
            justifyContent="center !important"
            alignItems={'center'}
            borderRadius={'4px'}>
            <IconButton
              color="primary"
              onClick={() => handleEditUser(row)}
            >
              <Edit />
            </IconButton>

            <IconButton
              color="error"
              onClick={() => handleDelete(row.id)}
            >
              <Delete />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <div className="px-4">
      {/* Dialog Add / Edit User */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(!dialogOpen)}
        TransitionComponent={Grow}
        fullWidth
        maxWidth="md"
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={userValidation}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns={inNonMobile ? "repeat(4,minmax(0,1fr))" : "repeat(2,minmax(0,1fr))"}
              >
                <TextField
                  sx={{ gridColumn: "span 2" }}
                  fullWidth
                  label="First Name"
                  variant="filled"
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  sx={{ gridColumn: "span 2" }}
                  fullWidth
                  variant="filled"
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <TextField
                  sx={{ gridColumn: "span 2" }}
                  fullWidth
                  label="Email"
                  variant="filled"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  sx={{ gridColumn: "span 2" }}
                  fullWidth
                  label="Age"
                  variant="filled"
                  type="number"
                  name="age"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.age && Boolean(errors.age)}
                  helperText={touched.age && errors.age}
                />
                <TextField
                  sx={{ gridColumn: "span 2" }}
                  fullWidth
                  variant="filled"
                  type="tel"
                  name="phone"
                  label="Phone Number"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                  error={touched.access && Boolean(errors.access)}
                >
                  <InputLabel>Access</InputLabel>
                  <Select
                    value={values.access}
                    label="Access Type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="access"
                  >
                    {accessOptions.map((op) => (
                      <MenuItem key={op.value} value={op.value}>
                        {op.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <DialogActions className="!px-0 !pb-0">
                <Button type="submit" variant="contained" className="w-full sm:w-auto">
                  {isEditMode ? "Save Changes" : "Add User"}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>

      {/* Header + Add Button */}
      <Box className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
        <Header title={"Team"} subTitle={"Managing The Team Members"} />
        <Box>
          <Button
            onClick={handleAddUser}
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
            Add User
          </Button>
        </Box>
      </Box>

      {/* DataGrid */}
      <Box className="DataGrid overflow-x-auto mt-4">
        <Box
          sx={{
            minWidth: 600,
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-columnHeaders": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
            "& .MuiDataGrid-cell": { borderBottom: "none" },
            "& .name-column-cell": { color: colors.greenAccent[300] },
            "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
            "& .MuiDataGrid-footerContainer ,& .MuiDataGrid-columnHeaders ": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            ".css-ts2lp0":{
              width:"100%"
            },
            ".MuiDataGrid-cell" :{
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              "> div":{
                maxHeight:"30px",
                height:"100%"
              }
            }
          }}
        >
          <DataGrid rows={users} columns={columns} autoHeight />
        </Box>
      </Box>
    </div>
  );
}
