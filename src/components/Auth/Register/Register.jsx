import { Box, TextField , Button, CircularProgress, InputAdornment, IconButton } from '@mui/material'
import Header from '../../Header/Header'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from "yup";
import { registerForm } from '../../Apis/AuthApis';
import toast from "react-hot-toast";
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const initialValues = {
  name:"",
  email:"",
  password:"",
  role:"admin"
}

const validationForm = yup.object().shape({
  name: yup.string().min(10).required('Name Is Required'),
  email: yup.string().email('Email Not Valid').required("Email Is Requried"),
  password: yup.string().matches(/^[A-Za-z]\w{6,8}$/,"Password Start With Letter And min 6 har max 8").required("Password Is Required"),
})

export default function Register() {
  const [showPassword , setShowPassword] = useState(false)
  const {mutate , isPending} = useMutation({
    mutationFn:registerForm,
    onSuccess:()=>{
      toast.success("Registration successful!.",{
        duration:2000,
        position:'top-right'
      })
    },
    onError:(error)=>{
      toast.error(error.response?.data?.message || "Something went wrong",{
        duration:2000,
        position:'top-right'
      })
    }
  })

  const handleRegisterForm = useCallback((values) => {
      mutate(values);
    },
    [mutate]
  );

  return (
    <div className="px-4">
      <Box className="mt-4">
        <Header
          title={"Register Now"}
          subTitle={"Now Can complete the form to login successfully"}
        />
        <Formik
          onSubmit={handleRegisterForm}
          initialValues={initialValues}
          validationSchema={validationForm}
        >{({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isValid,
          dirty
        })=>{
          return <form className="mt-5 pb-3 md:pb-0" onSubmit={handleSubmit}>
          <Box maxWidth={'500px'} mx={'auto'} mt={4} display={'flex'} flexDirection={'column'} gap={2}>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Full Name"
              className="mb-3"
              onBlur={handleBlur}
              value={values.name}
              onChange={handleChange}
              name="name"
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            ></TextField>
            <TextField
              fullWidth
              variant="filled"
              type="email"
              label="Eamil Address"
              className="mb-3"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              name="email"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            ></TextField>

            <TextField
              fullWidth
              variant="filled"
              type={showPassword ? "text" : "password"}
              label="Password"
              className="mb-3"
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              name="password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
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
            ></TextField>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={!isValid || !dirty || isPending}
              sx={{ fontWeight: 600, height: 45 }}
            >
              {isPending ? <CircularProgress size={24} color="inherit" /> : "Create New Admin"}
            </Button>
          </Box>
        </form>
        }}
        </Formik>
      </Box>
    </div>
  )
}
