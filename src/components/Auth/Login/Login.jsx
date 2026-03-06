import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginForm } from "../../Apis/AuthApis";
import { Formik } from "formik";
import { useContext, useState, useCallback } from "react";
import { authContext } from "../../../Context/AuthContextProvider";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { tokens } from "../../../theme";

const initialValues = {
  email: "",
  password: "",
};
const validationForm = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").max(20, "Maximum 20 characters").required("Password is required"),
});

export default function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { login } = useContext(authContext);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: loginForm,
    onSuccess: (data) => {
      if (data?.user && data?.token) {
        login(data.user, data.token);
        toast.success("Login successful!", {
          duration: 2000,
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error("Invalid server response");
      }
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Login failed!",
        {
          duration: 2000,
          position: "top-right",
        }
      );
    },
  });

  const handleLoginForm = useCallback(
    (values) => {
      mutate(values);
    },
    [mutate]
  );

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundImage:"url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
        }}
      />

      {/* Login Card */}
      <Box
        sx={{
          position: "relative",
          maxWidth: "500px",
          width:"100%",
          padding: "40px",
          borderRadius: "10px",
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >

        <Typography
          variant="h3"
          fontWeight="bold"
          color="white"
          textAlign="center"
          mb={1}
        >
          FASHION STORE
        </Typography>

        <Typography
          textAlign="center"
          color="rgba(255,255,255,0.7)"
          mb={4}
          variant="body1"
        >
          Sign In To Your Dashboard
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationForm}
          onSubmit={handleLoginForm}
          validateOnMount={true}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isValid,
            dirty,
          })=>{
            return <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{
                  mb: 2,
                  input: { color: "white" },
                  label: { color: "white" },
                }}
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                variant="filled"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword((prev) => !prev)
                        }
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  input: { color: "white" },
                  label: { color: "white" },
                }}
              />
              <Button
                fullWidth
                variant="filled"
                type="submit"
                color="secondary"
                disabled={!isValid || !dirty || isPending}
                sx={{
                  py: 1.3,
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderRadius: "5px",
                  background: colors.greenAccent[500],
                  transition:'0.3s all ease-in-out',
                  ":hover": {
                    background: colors.greenAccent[600],
                  },
                }}
              >
                {isPending ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>
            </form>
          }}
        </Formik>

      </Box>
    </Box>
  );
}
