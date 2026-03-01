import { Box, TextField , Button } from '@mui/material'
import Header from '../../Header/Header'
import { Password } from '@mui/icons-material'
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { loginForm } from '../../Apis/AuthApis';
import { Formik } from 'formik';
import { useContext } from 'react';
import { authContext } from '../../../Context/AuthContextProvider';
import toast from 'react-hot-toast';

const initialValues = {
  email:"",
  password:""
}

const validationForm = yup.object().shape({
  email: yup.string().email('Email Not Valid').required("Email Is Requried"),
  password: yup.string().matches(/^[A-Za-z]\w{6,8}$/,"Password Start With Letter And min 6 har max 8").required("Password Is Required"),
}) 

export default function Login() {
  let navigate = useNavigate()
  let {login} = useContext(authContext)
  async function handleLoginForm(values){
    try {
      const data = await loginForm(values);
      if(data?.user && data?.token){
        login(data.user , data.token)
      }else{
        console.error("Login failed: No user or token returned");
      }
      
      toast.success("Logined successful!.",{
        duration:2000,
        position:'top-right'
      })
      setTimeout(() => {
        navigate('/');
      }, 2100);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!",{
        duration:2000,
        position:'top-right'
      })
    }
  }
  return (
    <div className="px-4">
      <Box className="mt-4">
        <Header
          title={"Login Now"}
          subTitle={"Now Can complete the form to login successfully"}
        />
        <Formik onSubmit={handleLoginForm} initialValues={initialValues} validationSchema={validationForm}>
          {({values , errors , touched , handleBlur , handleChange , handleSubmit , isValid , dirty})=>{
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
                    type="email"
                    label="Eamil Address"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                    className='mb-3'
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    // sx={{ gridColumn:"span 4" }}
                  ></TextField>

                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    // sx={{ gridColumn:"span 4" }}
                  ></TextField>
                </Box>
                <Box display="flex" justifyContent={"end"} mt={"20px"}>
                  <Button disabled={!(isValid && dirty)} type="submit" color="secondary" variant="contained" sx={{ fontWeight:"600" }}>
                    Login
                  </Button>
                </Box>
              </form>
          }}
        </Formik>
        
      </Box>
    </div>
  )
}
