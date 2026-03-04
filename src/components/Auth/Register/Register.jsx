import { Box, TextField , Button } from '@mui/material'
import Header from '../../Header/Header'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from "yup";
import { registerForm } from '../../Apis/AuthApis';
import toast from "react-hot-toast";

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
  let navigate = useNavigate()
  async function handleRegisterForm(values , {resetForm}) {
    console.log(values);
    try {
      await registerForm(values);
      toast.success("Registration successful!.",{
        duration:2000,
        position:'top-right'
      })
      // setTimeout(() => {
      //   navigate('/login');
      // }, 2100);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong",{
        duration:2000,
        position:'top-right'
      })
    }
    resetForm()
  }
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
          <Box
            // display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4,minmax(0,1fr))"
            className='w-[60%] m-auto'
            sx={{
              // "&>div": { gridColumn: inNonMobile ? undefined : "span 2" },
              // "&>div": { gridColumn: inMobile ? "span 4" : "" },
            }}
          >
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
              type="password"
              label="Password"
              className="mb-3"
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              name="password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            ></TextField>
          </Box>
          <Box display="flex" justifyContent={"end"} mt={"20px"}>
            <Button type="submit" disabled={!(isValid && dirty)} color="secondary" variant="contained" sx={{ fontWeight:"600" }}>
              Create New Admin
            </Button>
          </Box>
        </form>
        }}</Formik>

      </Box>
    </div>
  )
}
