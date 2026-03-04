import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Header from "../../Header/Header";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginForm } from "../../Apis/AuthApis";
import { Formik } from "formik";
import { useContext, useState, useCallback } from "react";
import { authContext } from "../../../Context/AuthContextProvider";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const initialValues = {
  email: "",
  password: "",
};

const validationForm = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .max(20, "Maximum 20 characters")
    .required("Password is required"),
});

export default function Login() {
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
    <Box px={2} py={4}>
      <Header
        title="Login Now"
        subTitle="Enter your credentials to access dashboard"
      />

      <Formik
        initialValues={initialValues}
        validationSchema={validationForm}
        onSubmit={handleLoginForm}
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
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              maxWidth="500px"
              mx="auto"
              mt={4}
              display="flex"
              flexDirection="column"
              gap={3}
            >
              <TextField
                variant="filled"
                type="email"
                label="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                fullWidth
              />

              <TextField
                variant="filled"
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                fullWidth
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
              />

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={!isValid || !dirty || isPending}
                sx={{ fontWeight: 600, height: 45 }}
              >
                {isPending ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}
